const express = require('express');
const router = express.Router();
const InvoiceModel = require('../models/invoiceModel');

router.get('/', async (req, res, next) => {
    try{
        let allInvoices = await InvoiceModel.getAll();
        return res.json(allInvoices);
    }
    catch(e){
        return next(e)
    }
});

router.get('/:id', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Get Specific Invoice!'}));
    }
    catch(e){
        return next(e)
    }
});

router.post('/', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'New Invoice!'}));
    }
    catch(e){
        return next(e)
    }
});

router.put('/:id', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Update Invoice!'}));
    }
    catch(e){
        return next(e)
    }
});

router.delete('/:id', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Delete Invoice!'}));
    }
    catch(e){
        return next(e)
    }
});

module.exports = router;