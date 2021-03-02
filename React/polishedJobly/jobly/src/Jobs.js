import React, { useEffect, useState } from 'react';
import JoblyApi from './helpers/backEndAPI';
import SearchBar from './SearchBar';
import Job from './Job';

const Jobs = () => {
    //make a call to apiHelper
    //render the jobs as individual props with their own link
    let [listJobs, setListJobs] = useState([]);

    useEffect( () => {
        const getAllJobs = async () => {
            let data = await JoblyApi.getJobs();
            setListJobs(data);
            // console.log(listJobs)
        }

        getAllJobs();
    }, [setListJobs]);

    let jobRender = listJobs.length > 0 ? listJobs.map((job, idx) => {
        // console.log(job)
        return <div className='card'>
                    <Job key={job.id}
                        identifier={job.id} 
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        company={job.companyName} />
                </div>
        }) : null;
    
    const search = async (searchTerm = {}) => {
        let data = await JoblyApi.getSpecificJob(searchTerm);
        // console.log(data)
        setListJobs(data);
    }

    return (
        <div className='shadow align-content-center'>
            <br/>
            <SearchBar type='job' search={search}/>
        <br />
            {jobRender ? jobRender : <div className='spinner-border'><span class="sr-only">Loading...</span></div>}
        </div>
    );
}

export default Jobs;