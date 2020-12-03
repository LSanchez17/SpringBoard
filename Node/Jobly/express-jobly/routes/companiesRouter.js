const express = require('express');
const Companies = require('../models/companiesModel');
const {authenticateUser, isAdminCheck} = require('../middleware/authenticate');
const { validate } = require('jsonschema');
const { newCompanySchema, updateCompanySchema } = require('../schemas/index');
const ExpressError = require('../helpers/ExpressError');
const router = new express.Router();

router.get('/', authenticateUser, async (req, res, next) => {
    //Get all companies(handle,name) by default
    //only returns subset if given params
    try{
        if(Object.keys(req.query).length == 0){
            let listCompanies = await Companies.getAll();

            return res.json({companies: [listCompanies] });
        }
        else{
            let specificCompanies = await Companies.someCompanies(req.query);
            return res.json({companies: [specificCompanies]});
        }
    }
    catch(e){
        return next(e);
    }
})

router.post('/', isAdminCheck, async (req, res, next) => {
    //creates a new company and returns it to user
    try{
        let validation = validate(req.body, newCompanySchema);

        if(!validation.valid){
            throw new ExpressError(validation.errors.map(err => err.stack), 400);
        }
        
        let companyData = await Companies.create(req.body);
        return res.json({company: companyData});
    }
    catch(e){
        return next(e);
    }
})

router.get('/:handle', authenticateUser, async (req, res, next) => {
    //Returns one company by handle param
    try{
        let companyData = await Companies.getIndividual(req.params.handle);
        if(companyData){
            return res.json({company: companyData});
        }
        return res.json({company: `No data for ${req.params.handle}`});
    }
    catch(e){
        return next(e);
    }
})

router.patch('/:handle', isAdminCheck ,async (req, res, next) => {
    //Update company info via handle param
    try{
        let validation = validate(req.body, updateCompanySchema);

        if(!validation.valid){
            throw new ExpressError(validation.errors.map(err => err.stack), 400);
        }

        let updatedCompany = await Companies.updateCompany(req.params.handle, req.body);
        if(updatedCompany){
            return res.json({company: updatedCompany});
        }
        return res.json({message: `${req.parms.handle} does not exist`});
    }
    catch(e){

    }
})

router.delete('/:handle', isAdminCheck, async (req, res, next) => {
    //remove company via handle param
    try{
        let removedCompany = await Companies.removeCompany(req.params.handle);
        if(removedCompany){
            return res.json({message: `Company: ${req.params.handle} deleted!`});
        }
        return res.json({message: `${req.params.handle} does not exist`});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;