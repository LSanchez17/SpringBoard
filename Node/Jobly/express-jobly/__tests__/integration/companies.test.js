process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = require('../../config');

let company;
let authUser;
let tokenSpawn;

let companyParam = 'FB';

beforeEach(async () => {
    //add some records to db for companies
    let result = await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES('FB', 'Facebook', 10000, 'Facebook social media', 'fb.url')
    RETURNING handle, name, num_employees, description, logo_url`);

    company = result.rows[0];

    //create a new user, with admin rights
    const hashPass = await bcrypt.hash('password', 1);
    let secondResult = await db.query(`
    INSERT INTO users(username, password, first_name, last_name, email, photo_url, is_admin)
    VALUES('Test', $1, 'Te1ster', 'McTest', 'test@email.com', 'fb.img', true)
    RETURNING username, is_admin`, [hashPass]);

    authUser = secondResult.rows[0];

    // console.log(authUser);

    tokenSpawn = jwt.sign(authUser, SECRET_KEY);
})

afterEach(async () => {
    //clear database
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM users');
})

afterAll(async () => {
    //close connections!
    await db.end();
})

describe('Testing /companies API endpoints', () => {
    it('GET /companies not authorized ', async () => {
        //Authenticate User first, otherwise it will fail
        let res = await request(app).get('/companies');

        expect(res.statusCode).toBe(500);
    })

    it('GET /companies with authorization', async () => {
        //Authenticated user gets list of companies
        //Not sending a req.query with this one
        let res = await request(app).get('/companies').send({_token: tokenSpawn});

        // console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({companies: expect.any(Object)}))
    })

    it('GET /companies with query params', async () => {
        //get a result with req.query
        let res = await request(app).get('/companies').send({
            _token: tokenSpawn, 
            query: {min_employees: 1000}
        });

        // console.log(res);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({companies: expect.any(Object)}));
    })

    it('GET /companies/:handle to return specific company', async () => {
        //get a certain company back
        let res = await request(app).get(`/companies/${companyParam}`).send({
            _token: tokenSpawn,
            handle: 'FB'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({company: expect.any(Object)}));
    })

    it('POST /companies to post a new company', async () => {
        //Add new company to API endpoint
        let res = await request(app).post('/companies').send({
            handle: 'IBM',
            name: 'International Business Machines',
            num_employees: 50000,
            description: 'Does beep boop bidness',
            logo_url: 'logoUnavailable',
            _token: tokenSpawn
        });

        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({company: expect.any(Object)}));
    })

    it('PATCH /companies to update company info', async () => {
        //Update FB mock name to Google
        let res = await request(app).patch(`/companies/${companyParam}`).send({
            handle: 'FB',
            name: 'Google',
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({company: expect.any(Object)}));
    })

    it('DELETE /companies to remove a company', async () => {
        //delete FB
        let res = await request(app).delete(`/companies/${companyParam}`).send({
            handle: 'FB',
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({message: `Company: ${companyParam} deleted!`}));
    })
})
