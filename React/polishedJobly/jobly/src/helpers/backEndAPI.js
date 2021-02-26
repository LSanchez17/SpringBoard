//interacts with out back end for getting data!
import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class JoblyApi {
    //token is used for interacting with out api that require it
    static token;

    //Ties together requests and any data that needs uploaded.
    //so we send the endpoint, and the data, if any, and the method if any
    //then based on that, we decide what to try :D
    static async request(urlEndpoint, data={}, method="get"){
        console.debug('API:', urlEndpoint, data, method);

        const url = `${URL}/${urlEndpoint}`;
        const headers = {Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get") ? data : {};

        try{
            return (await axios({url, method, data, params, headers})).data;
        }
        catch(err){
            console.error('API no go Brrr', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /* Now for individual methods, etc */

    //Handles the retrieval of a single company,
    //url structure companies/:whichCompany
    static async getCompany(whichCompany){
        let res = await this.request(`companies/${whichCompany}`);
        // console.log(res)
        return res.company;
    }

    static async getCompanyFromSearch(searchTerm){
        let res = await this.request('companies', searchTerm);
        console.log(res)
        return res.companies;
    }

    static async getCompanyJobs(whichCompany){
        let res = await this.request(`companies/${whichCompany}`);
        return res.company.jobs;
    }

    static async getAllCompanies(){
        //get a list of all companies
        let res = await this.request(`companies`);
        // console.log(res)
        return res.companies;
    }

    static async getJobs(){
        //get a list of all jobs
        let res = await this.request(`jobs`);
        return res.jobs;
    }

    static async getSpecificJob(searchTerm){
        let res = await this.request('jobs', searchTerm);
        console.log(res)
        return res.jobs;
    }
    static async getUserInfo(){
        //gets user information for form data values
    }

    static async logOut(){
        //log user out, remove token
    }

    static async logIn(username, password){
        //log user in, store infor into store token
    }

}

export default JoblyApi;