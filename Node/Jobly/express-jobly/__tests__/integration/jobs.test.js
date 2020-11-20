process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = require('../../config');
const Jobs = require('../../models/jobsModel');

let company;
let authUser;
let tokenSpawn;
let job;

let jobId = 1;

beforeEach(async () => {
    //add some records to db for companies
    let result = await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES('IBM', 'International Business Machines', 20000, 'Bidness', 'NA')
    RETURNING handle, name, num_employees, description, logo_url`);

    company = result.rows[0];

    //create a new user, with admin rights
    const hashPass = await bcrypt.hash('password', 1);
    let secondResult = await db.query(`
    INSERT INTO users(username, password, first_name, last_name, email, photo_url, is_admin)
    VALUES('Tim', $1, 'Te1ster', 'McTest', 'test@double.com', 'fb.img', true)
    RETURNING username, is_admin`, [hashPass]);

    authUser = secondResult.rows[0];
    tokenSpawn = jwt.sign(authUser, SECRET_KEY);

    //create a new job posting
    let thirdResult = await db.query(`
    INSERT INTO jobs(id, title, salary, equity, company_handle, date_posted)
    VALUES(1, 'Software Engineer', 80000, .5, 'IBM', current_timestamp)
    RETURNING title, salary, equity, company_handle, date_posted`);

    job = thirdResult.rows[0];
})

afterEach(async () => {
    //clear database
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM jobs')
})

afterAll(async () => {
    //close connections!
    await db.end();
})

describe('Testing /jobs API endpoints', () => {
    it('GET /jobs not authorized ', async () => {
        //Authenticate User first, otherwise it will fail
        let res = await request(app).get('/jobs');

        expect(res.statusCode).toBe(500);
    })

    it('GET /jobs with authorization', async () => {
        //Authenticated user gets list of jobs
        //Not sending a req.query with this one
        let res = await request(app).get('/jobs').send(
            {_token: tokenSpawn});

        // console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({jobs: expect.any(Object)}))
    })

    it('GET /jobs with query params', async () => {
        //get a result with req.query
        let res = await request(app).get('/jobs').send({
            _token: tokenSpawn, 
            query: {salary: 10000}
        });

        // console.log(res);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({jobs: expect.any(Object)}));
    })

    it('GET /jobs/:id to return specific company', async () => {
        //get a certain company back
        let res = await request(app).get(`/jobs/${jobId}`).send({
            _token: tokenSpawn,
            id: jobId
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({jobs: expect.any(Object)}));
    })

    it('POST /jobs to post a new job', async () => {
        //Add new company to API endpoint
        let res = await request(app).post('/jobs').send({
            id: 2,
            title: 'Data Analyst',
            salary: 50000,
            equity: .01,
            company_handle: 'IBM',
            _token: tokenSpawn
        });

        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({jobs: expect.any(Object)}));
    })

    it('PATCH /jobs to update job info', async () => {
        //Update FB mock name to Google
        let res = await request(app).patch(`/jobs/${jobId}`).send({
            id: jobId,
            salary: 120000,
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({jobs: expect.any(Object)}));
    })

    it('DELETE /jobs to remove a job', async () => {
        //delete FB
        let res = await request(app).delete(`/jobs/${jobId}`).send({
            id: jobId,
            _token: tokenSpawn
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({message: `Job: ${jobId} has been deleted`}));
    })
})
