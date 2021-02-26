import React, { useEffect, useState } from 'react';
import JoblyApi from './helpers/backEndAPI';
import SearchBar from './SearchBar';
import Job from './Job';

const Jobs = () => {
    //make a call to apiHelper
    //render the jobs as individual props with their own link
    let [listJobs, setListJobs] = useState([]);
    let [specificJob, setSpecificJob] = useState([]);

    useEffect( () => {
        const getAllJobs = async () => {
            let data = await JoblyApi.getJobs();
            setListJobs(data);
            console.log(listJobs)
        }

        getAllJobs();
    }, []);

    let jobRender = listJobs.length > 0 ? listJobs.map(job => {
        return <Job key={job.id} 
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        company={job.companyName} />
        }) : null;
    
    const search = async (searchTerm) => {
        let data = await JoblyApi.getSpecificJob(searchTerm);
        setSpecificJob(data);
        jobRender = specificJob;
    }

    return (
        <div>
            <SearchBar type='job'/>
            <br />
            {jobRender ? jobRender : <b>Loading...</b>}\
        </div>
    );
}

export default Jobs;