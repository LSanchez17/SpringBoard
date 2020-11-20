const { init } = require('../app');
const db = require('../db');
const ExpressError = require("../helpers/ExpressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Companies {
    static async getAll(){
        let queryResult = await db.query(
            `SELECT handle, name, num_employees, description
             FROM companies`);
        
        if(!queryResult.rows[0]){
            throw new ExpressError('No Companies in database', 500);
        }
        return queryResult.rows[0];
    }

    static async someCompanies(paramObject){
        //trouble with this one
        let InitialQuery = 'SELECT handle, name FROM companies';
        let additionalParams = [];
        let values = [];

        if(!paramObject){
            let queryResult = await db.query(
                `SELECT handle, name, num_employees, description
                 FROM companies`);
            
            if(!queryResult.rows[0]){
                throw new ExpressError('No Companies in database', 500);
            }
            return queryResult.rows[0];
        }

        if(+paramObject.min_employees >= +paramObject.max_employees){
            throw new ExpressError('Incompatible employee filters', 400);
        }

        if(paramObject.search){
            values.push(`%${paramObject.search}`);
            additionalParams.push(`name ILIKE $${values.length}`);
        }

        if(paramObject.max_employees){
            values.push(+paramObject.max_employees);
            additionalParams.push(`num_employees <= $${values.length}`);
        }

        if(paramObject.min_employees){
            values.push(+paramObject.min_employees);
            additionalParams.push(`num_employees >= $${values.length}`);
        }

        let finalQuery = InitialQuery + ' WHERE ' + additionalParams.join(' AND ');
        console.log(finalQuery);

        let queryResult = await db.query(finalQuery, values);

        if(!result.rows[0]){
            throw new ExpressError('Error during query return', 500);
        }

        return queryResult.rows[0];
    }

    static async create(dataObject){
        let dupeCompany = await db.query(`
        SELECT handle 
        FROM companies
        WHERE handle=$1`, [dataObject.handle]);

        if(dupeCompany.rows[0]){
            throw new ExpressError('Company already exists!', 500);
        }

        let queryResult = await db.query(`
        INSERT INTO companies(handle, name, num_employees, description, logo_url)
        VALUES($1,$2,$3,$4, $5)
        RETURNING handle, name, num_employees, description, logo_url`,
        [
          dataObject.handle,
          dataObject.name,
          dataObject.num_employees,
          dataObject.description,
          dataObject.logo_url
        ]);

        return queryResult.rows[0];
    }

    static async getIndividual(companyName){
        let queryResult = await db.query(`
        SELECT handle, name, num_employees, description, logo_url
        FROM companies
        WHERE handle=$1`,[companyName]);
       
        if(!queryResult.rows[0]){
           throw new ExpressError('Invalid Company id', 400);
        }

        let company = queryResult.rows[0];

        let jobsInCompany = await db.query(`
        SELECT id, title, salary, equity
        FROM jobs
        WHERE company_handle=$1`,[companyName]);

        company.jobs = jobsInCompany.rows;

        return company;
    }

    static async updateCompany(companyName, data){
        //Not quit sure this works?
        let {query, values} = sqlForPartialUpdate('companies', data, 'handle', companyName);

        const queryResult = await db.query(query, values);

        if(!queryResult.rows[0]){
            throw new ExpressError(`Error during querying`, 500);
        }

        return queryResult.rows[0];
    }

    static async removeCompany(companyName){
        //remove company
        let queryResult = await db.query(`
        DELETE FROM companies 
        WHERE handle=$1
        RETURNING handle`, [companyName]);

        if(!queryResult.rows[0]){
            throw new ExpressError(`Cant delete ${companyName}`, 500);
        }

        return queryResult.rows[0];
    }

}

module.exports = Companies;