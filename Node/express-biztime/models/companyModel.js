const db = require('../db');
const ExpressError = require('../expressError');

class Company {
    constructor(code, name, description){
        this.code = code;
        this.name = name;
        this.description = description;
    }

    static async getAll(){
        let results = await db.query('SELECT * FROM companies');
        return results.rows
    }

    static async oneCompany(companyCode){
        let result = await db.query(`SELECT code, name, description FROM companies WHERE companies.code = $1`, [companyCode]);
        let data = result.rows[0];
        if(!data){
            throw new ExpressError('Company not found', 404);
        }
        return new Company(data.code, data.name, data.description);
    }

    static async createCompany(newCode, newName, newDescription){
        let result = await db.query('INSERT INTO companies(code, name, description) VALUES($1,$2,$3) RETURNING code,name,description', [newCode, newName, newDescription]);
        let {code, name, description} = result.rows[0];
    
        return new Company(code, name, description);
    }

    async update(){
        let result = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3', [this.name, this.description, this.code]);
        return ({'Message':`Updated ${this.code}`});
    }

    async deleteCompany(){
        let result = await db.query('DELETE FROM companies WHERE code = $1', [this.code]);
        return ({'Message': `Company ${this.code} deleted`});
    }
}

module.exports = Company;