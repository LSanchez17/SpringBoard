const { use } = require('../app');
const db = require('../db');
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const bcrypt = require('bcrypt');

const WORK_FACTOR = 12;
/*  User Table
*  username,
*  password, 
*  first_name,
*  last_name, 
*  email,
*  photo_url,
*  is_admin
*/

class Users {
    static async verifyLogin(data){
        //authenticateUser, think classmethods in python ORM's where we authenticate in
        //the user instance

        let result = await db.query(`
        SELECT username, password, first_name, last_name, email, photo_url, is_admin
        FROM users
        WHERE username=$1`,[data.username]);

        if(!result.rows[0]){
            throw new ExpressError('No user for authentication found', 500);
        }

        if(result.rows[0]){
            let isAuth = await bcrypt.compare(data.password, result.rows[0].password);
            if(isAuth){
                return user;
            }
        }

        throw new ExpressError('Invalid credential/username combo', 401);
    }

    static async getAll(){
        //get all users
        let result = await db.query(`
        SELECT username, first_name, last_name, email
        FROM users
        ORDER BY username`);

        if(!result.rows){
            throw new ExpressError('No users able to be retrieved', 500);
        }

        return result.rows;
    }

    static async getOne(username){
        //get single user using parameter
        let result = await db.query(`
        SELECT username, first_name, last_name, email
        FROM users
        WHERE username=$1`, [username]);

        if(!result.rows[0]){
            throw new ExpressError(`${username} cannot be retrieved`, 500);
        }

        return result.rows[0];
    }

    static async createUser(userObject){
        //create a new user
        let dupeUser = await db.query(`
        SELECT username 
        FROM users
        WHERE username=$1`, [userObject.username]);

        if(dupeUser.rows[0]){
            throw new ExpressError('User already exists!', 400);
        }

        let password = await bcrypt.hash(userObject.password, WORK_FACTOR);

        let result = await db.query(`
        INSERT INTO users(username, password, first_name, last_name, email, photo_url, is_admin)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING username, password, first_name, last_name, email, photo_url, is_admin`, [
            userObject.username,
            password,
            userObject.first_name,
            userObject.last_name,
            userObject.email,
            userObject.photo_url,
            userObject.is_admin
            ]);

        if(!result.rows[0]){
            throw new ExpressError('Unable to create user', 500);
        }

        return result.rows[0];
    }

    static async updateUser(username, updatedInfo){
        //update a user
        if(updatedInfo.password){
            updatedInfo.password = await bcrypt.hash(updatedInfo.password, WORK_FACTOR);
        }

        let {query, values} = sqlForPartialUpdate('users', updatedInfo, 'username', username);

        let result = await db.query(query, values);

        if(!result.rows[0]){
            throw new ExpressError('Error during udpate', 500);
        }

        return result.rows[0];
    }

    static async deleteUser(username){
        //delete a user 
        let result = await db.query(`
        DELETE FROM users
        WHERE username=$1
        RETURNING username`, [username]);

        if(!result.rows[0]){
            throw new ExpressError(`${username} cannot be deleted`);
        }

        return result.rows[0];
    }
}

module.exports = Users;