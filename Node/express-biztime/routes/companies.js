const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/companyModel');

router.get('/', async (req, res, next) => {
    try{
        let allCompanies = await CompanyModel.getAll();
        return res.json(allCompanies);
    }
    catch(e){
        return next(e)
    }
});

router.get('/:code', async (req, res, next) => {
    /**Returns company based on company code*/
    try{
        let individualCompany = await CompanyModel.oneCompany(req.params.code);
        return res.json(individualCompany);
    }
    catch(e){
        return next(e)
    }
});
 
router.post('/', async (req, res, next) => {
    try{
        let {code,name,description} = req.body;
        let madeCompany = await CompanyModel.createCompany(code, name, description);
        return res.json(madeCompany)
    }
    catch(e){
        return next(e)
    }
});

router.patch('/:code/update', async (req, res, next) => {
    try{
        let updatedCompany = await CompanyModel.oneCompany(req.params.code);
        updatedCompany.name = req.body.name;
        updatedCompany.description = req.body.description;

        console.log(`Current model: name:${updatedCompany.name}, desc:${updatedCompany.description}`)
        let result = await updatedCompany.update();
        return res.json(result);
    }
    catch(e){
        return next(e)
    }
});

router.delete('/:code', async (req, res, next) => {
    try{
        let deletedCompany = await CompanyModel.oneCompany(req.params.code);
        let message = await deletedCompany.deleteCompany();
        return res.json(message);
    }
    catch(e){
        return next(e)
    }
});




module.exports = router;