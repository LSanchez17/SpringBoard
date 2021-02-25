import React, { useEffect, useState } from 'react';
import JoblyApi from './helpers/backEndAPI';
import Job from './Job';

const Jobs = () => {
    //make a call to apiHelper
    //render the jobs as individual props with their own link
    let [listJobs, setListJobs] = useState([]);

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
    
    return (
        <div>
            {jobRender ? jobRender : <b>Loading...</b>}\
        </div>
    );
}

export default Jobs;