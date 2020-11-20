const db = require('../db');
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

/* JOBS table
*  id,
*  title
*  salary,
*  equity
*  company_hande(FK)
*  date_posted
*/

class Jobs {
    static async getAll(){
    //Get all jobs, titles, company handles, order by date posted
        let result = await db.query(`
        SELECT j.title, j.date_posted, c.handle
        FROM jobs j
        INNER JOIN companies c on j.company_handle = c.handle
        ORDER BY j.date_posted ASC
        `)

        if(!result.rows[0]){
            throw new ExpressError('Unable to query database', 500);
        }

        return result.rows[0];
    }

    static async getSomeJob(jobObj){
    //get some jobs,based on data passed in
    //search term, min_salary, min_equity
        let initialQuery = `SELECT title, company_handle, date_posted`;
        let otherParams = [];
        let valuesInserted = [];

        if(!jobObj){
            let result = await db.query(`
            SELECT title, company_handle, date_posted
            FROM jobs`);

            if(!result.rows[0]){
                throw new ExpressError('No jobs available!', 500);
            }

            return result.rows[0];
        }

        if(jobObj.searchTerm){
            valuesInserted.push(`%${jobObj.searchTerm}%`);
            otherParams.push(`title ILIKE $${valuesInserted.length}`);
        }

        if(+jobObj.min_salary){
            valuesInserted.push(+jobObj.min_salary);
            otherParams.push(`salary >= $${valuesInserted.length}`);
        }

        if(+jobObj.min_equity){
            valuesInserted.push(+jobObj.min_equity);
            otherParams.push(`equity >= $${valuesInserted.length}`);
        }

        let combinedQuery = initialQuery + ' WHERE ' + otherParams.join(' AND ');
        console.log(combinedQuery, valuesInserted);

        let result = await db.query(combinedQuery, valuesInserted);
        
        if(!result.rows[0]){
            throw new ExpressError('Error during query return', 500);
        }

        return result.rows[0];
    }

    static async getOneJobs(jobParam){
        let result = await db.query(`
        SELECT id, title, salary, equity, company_handle
        FROM jobs
        WHERE id=$1`,[jobParam]);
       
        if(!result.rows[0]){
           throw new ExpressError('Invalid search id', 500);
        }

        let job = result.rows[0];

        let companies = await db.query(`
        SELECT name, num_employees, description, logo_url
        FROM companies
        WHERE handle=$1`, [job.company_handle]);

        job.company = companies.rows[0];

        return job;
    }

    static async postJob(jobObject){
    //Post a job, authentication handled on route 
        let result = await db.query(`
        INSERT INTO jobs(title, salary, equity, company_handle, date_posted)
        VALUES($1,$2,$3,$4, current_timestamp)
        RETURNING title, salary, equity, company_handle, date_posted`,
        [jobObject.title,
         jobObject.salary,
         jobObject.equity,
         jobObject.company_handle]);

        if(!result.rows[0]){
            throw new ExpressError('Unable to post new job', 500);
        }

         return result.rows[0];
    }

    static async updateJob(jobId, data){
    //Update a job, authentication handled on route
    //  * - table: where to make the query
    //  * - items: an object with keys of columns you want to update and values with
    //  *          updated values
    //  * - key: the column that we query by (e.g. username, handle, id)
    //  * - id: current record ID
        let { query, values } = sqlForPartialUpdate('jobs', data, 'id', jobId);

        let result = await db.query(query, values);

        if(!result.rows[0]){
            throw new ExpressError('Error during update', 500);
        }

        return result.rows[0];
    }

    static async deleteJob(jobId){
        //Remove a job, authentication handled on route
        let result = await db.query(`
        DELETE FROM jobs
        WHERE id=$1
        RETURNING id`,
        [jobId]);

        if(!result.rows[0]){
            throw new ExpressError('Cannot delete that job!', 500);
        }

        return result.rows[0];
    }
}

module.exports = Jobs;