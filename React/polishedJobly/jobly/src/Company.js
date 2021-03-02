import React, { useEffect, useState } from 'react';
import JoblyApi from './helpers/backEndAPI';
import {useParams} from 'react-router-dom';
import Job from './Job';

const Company = ({name = ''}) => {
    let [companyData, setCompanyData] = useState([]);
    let [companyJobs, setCompanyJobs] = useState([]);
    let paramName = useParams().companyName;
    let companyHandle = name ? name : paramName;

    useEffect( () => {
        const getOneCompany = async () => {
            let data = await JoblyApi.getCompany(companyHandle);
            // console.log(data)
            setCompanyData(data);
        }        
    
        getOneCompany();

        const getCompanyJobs = async () => {
            let jobs = await JoblyApi.getCompanyJobs(companyHandle);
            setCompanyJobs(jobs);
        }

        getCompanyJobs();
    }, []);

    let renderedJobs = companyJobs.length > 0 ? companyJobs.map(job => {
        return <div>
                   <Job key={job.id}
                        identifier={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        company={job.Company} />
               </div>
    }) : <b>loading...</b>;

    return (
        <div className='container-fluid bg-light shadow'>
            <div className='shadow'>
                <h3>{companyData.name}</h3>
                <p>{companyData.description}</p>
                <small>{companyData.numEmployees} Employees</small>
                <br />
                <img src={companyData.imageURL} alt={`${companyData.name} company`}></img>
            </div>

            <div>
                {renderedJobs}
            </div>
        </div>
    );
}

export default Company;