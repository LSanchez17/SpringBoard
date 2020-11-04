/** User class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require('bcrypt');

const { BCRYPT_WORK_FACTOR } = require('../config');

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */
  static async register({username, password, first_name, last_name, phone}) { 
    try{
      const hashPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

      const registered = await db.query(`
      INSERT INTO 
      users(username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1,$2,$3,$4,$5, current_timestamp, current_timestamp) 
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashPass, first_name, last_name, phone]);
      
      // console.log(registered.rows[0])

      return registered.rows[0];
    }
    catch(e){
      if(e.code === '2305'){
        return new ExpressError(`username ${username} already exists!`, 400);
      }
      return new ExpressError('Something went wrong!', 500);
    }
    
  }  

  /** Authenticate: is this username/password valid? Returns boolean. */
  static async authenticate(username, password) {
    const hashPass = await db.query(`
    SELECT password
    FROM users
    WHERE username = $1`, [username]);

    let user = hashPass.rows[0];

    if(!user){
      throw new ExpressError(`User ${username} does not exist!`, 404);
    }

    try{
      return user && await bcrypt.compare(password, user.password);
    }
    catch(e){
      throw new ExpressError('Invalid User/Password combo wombo', 400) 
    }
   }

  /** Update last_login_at for user */
  static async updateLoginTimestamp(username) {
    const result = await db.query(`
    UPDATE users 
    SET last_login_at = current_timestamp
    WHERE username = $1
    RETURNING username`,[username]);

    if(!result.rows[0]){
      throw new ExpressError('No user exists!', 404);
    }

    return result.rows[0]
   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */
  static async all() { 
    const results = await db.query(`
    SELECT username, first_name, last_name, phone 
    FROM users
    ORDER BY username`);

    return [results.rows[0]];
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */
  static async get(username) {
    const user = await db.query(`
    SELECT username, first_name, last_name, phone, join_at, last_login_at
    FROM users
    WHERE username = $1`,[username]);

    if(!user.rows[0]){
      throw new ExpressError(`No user exists:${username}, 404`);
    }

    return user.rows[0];
   }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */
  static async messagesFrom(username) {
    const messages = await db.query(`
    SELECT m.id, m.to_username, 
           u.first_name, u.last_name, u.phone,
           m.body, m.sent_at, m.read_at 
    FROM messages AS m
        JOIN users AS u ON m.to_username = u.username
    WHERE from_username = $1
    `, [username]);

    if(!messages.rows){
      throw new ExpressError(`User:${username} has not sent any sent messages!`, 404);
    }

    return messages.rows.map(message => ({
      id: message.id,
      to_user:{
        username: message.to_username,
        first_name: message.first_name,
        last_name: message.last_name,
        phone: message.phone
      },
      body: message.body,
      sent_at: message.sent_at,
      read_at: message.read_at
    }));
   }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */
  static async messagesTo(username) {
    const messages = await db.query(`
    SELECT m.id, m.from_username, 
           u.first_name, u.last_name, u.phone,
           m.body, m.sent_at, m.read_at 
    FROM messages AS m
        JOIN users AS u ON m.from_username = u.username
    WHERE to_username = $1`, [username]);

    if(!messages.rows[0]){
      throw new ExpressError(`User:${username} does not have any messages!`, 404);
    }

    return messages.rows.map(message => ({
      id: message.id,
      from_user: {
        username: message.from_username,
        first_name: message.first_name,
        last_name: message.last_name,
        phone: message.phone
      },
      body: message.body,
      sent_at: message.sent_at,
      read_at: message.read_at
    }));
   }
}


module.exports = User;