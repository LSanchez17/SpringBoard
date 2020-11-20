process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = require('../../config');

let authUser;
let tokenSpawn;

let unauthUser;
let unauthToken;

let username = 'Tim';
let secondUser = 'Lee';

beforeEach(async () => {
    //create a new user, with admin rights
    const hashPass = await bcrypt.hash('password', 1);
    let firstResult = await db.query(`
    INSERT INTO users(username, password, first_name, last_name, email, is_admin)
    VALUES($1, $2, 'Tester', 'McTest', 'test@double.com', true)
    RETURNING username, is_admin`, [username, hashPass]);

    authUser = firstResult.rows[0];
    tokenSpawn = jwt.sign(authUser, SECRET_KEY);

    //create user, no admin rights
    const hashedPassTwo = await bcrypt.hash('super', 1);
    let secondResult = await db.query(`
    INSERT INTO users(username, password, first_name, last_name, email, is_admin)
    VALUES($1, $2, 'Leevi', 'Lesse', 'Levi@levvy.com', false)
    RETURNING username, is_admin,`, [secondUser, hashedPassTwo]);

    unauthUser = secondResult.rows[0];
    unauthToken = jwt.sign(unauthUser, SECRET_KEY);
})

afterEach(async () => {
    //clear database
    await db.query('DELETE FROM users');
})

afterAll(async () => {
    //close connections!
    await db.end();
})

describe('Testing /users API endpoints', () => {
    //********** SHOULD BE PASSING? NOT SURE WHY IT FAILS :( */
   
    it('GET /users not authorized ', async () => {
        //Authenticate User first, otherwise it will fail
        let res = await request(app).get('/users');
        // console.log(res.error.status)
        expect(res.statusCode).toEqual(500);
    })

    it('GET /users with authorization', async () => {
        //Authenticated user gets list of jobs
        //Not sending a req.query with this one
        let res = await request(app).get('/users').send(
            {_token: tokenSpawn});

        // console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({user: expect.any(Array)}))
    })

    it('GET /users/:username to return specific user', async () => {
        //get a certain company back
        let res = await request(app).get(`/users/${username}`).send({
            _token: tokenSpawn,
            username: username
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({user: expect.any(Object)}));
    })

    it('POST /users to create a new user', async () => {
        //Add new company to API endpoint
        let hashedPass = await bcrypt.hash('newPass', 1);

        let res = await request(app).post('/users').send({
            username: 2,
            password: hashedPass,
            first_name: 'John',
            last_name: 'Tomais',
            email: 'IBM@machines.com',
            photo_url: 'NA',
            is_admin: 'false',
            _token: tokenSpawn
        });

        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({user: expect.any(Object)}));
    })

    it('PATCH /users to update user info', async () => {
        //Update FB mock name to Google
        let res = await request(app).patch(`/users/${username}`).send({
            username: username,
            password: 'new',
            is_admin: false,
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({user: expect.any(Object)}));
    })

    it('DELETE /users to remove a user', async () => {
        //delete FB
        let res = await request(app).delete(`/users/${username}`).send({
            username: username,
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({message: `${username} has been deleted`}));
    })
})
