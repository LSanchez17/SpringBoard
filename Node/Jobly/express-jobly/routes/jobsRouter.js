const express = require('express');
const Jobs = require('../models/jobsModel');
const {authenticateUser, isAdminCheck} = require('../middleware/authenticate');
const router = new express.Router();

router.get('/', authenticateUser, async (req, res, next) => {
    //get all jobs
    try{
        if(Object.keys(req.query).length == 0){
            let listJobs = await Jobs.getAll();

            return res.json({jobs: [listJobs]});
        }
        else{
            let specificJobs = await Jobs.getSomeJob(req.query);
            return res.json({jobs: [specificJobs]});
        }
    }
    catch(e){
        return next(e);
    }
})

router.get('/:id', authenticateUser, async (req, res, next) => {
    //get specific job
    try{
        let individualJob = await Jobs.getOneJobs(req.params.id);

        if(individualJob){
            return res.json({jobs: individualJob});
        }

        return res.JSON({jobs: `No jobs found, see logs for details`});
    }
    catch(e){
        return next(e);
    }
})

router.post('/', isAdminCheck, async (req, res, next) => {
    //post a job, need authentication
    try{
        let jobPosting = await Jobs.postJob(req.body);
        return res.json({jobs: jobPosting});
    }
    catch(e){
        return next(e);
    }
})

router.patch('/:id', isAdminCheck, async (req, res, next) => {
    //uodate a job, needs authentication
    try{
        let updateJobPosting = await Jobs.updateJob(req.params.id, req.body);
        if(updateJobPosting){
            return res.json({jobs: updateJobPosting})
        }
        return res.json({message: 'Couldnt update job, check logs'});
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:id', isAdminCheck, async (req, res, next) => {
    //delete job, needs authentication
    try{
        let removeJob = await Jobs.deleteJob(req.params.id);
        if(removeJob){
            return res.json({message: `Job: ${req.params.id} has been deleted`});
        }
        return res.json({message: `Unable to delete ${req.params.id}`});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;