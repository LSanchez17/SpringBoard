const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Invoices!'}));
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