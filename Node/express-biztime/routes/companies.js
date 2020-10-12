const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'All Companies!'}));
    }
    catch(e){
        return next(e)
    }
});

router.get('/:code', (req, res, next) => {
    /**Returns company code with invoice id */
    try{
        return res.send(JSON.stringify({ message: 'Particular Code!'}));
    }
    catch(e){
        return next(e)
    }
});

router.post('/', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Company Created!'}));
    }
    catch(e){
        return next(e)
    }
});

router.put('/:code', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Copmany Edited!'}));
    }
    catch(e){
        return next(e)
    }
});

router.delete('/:code', (req, res, next) => {
    try{
        return res.send(JSON.stringify({ message: 'Deleted Company!'}));
    }
    catch(e){
        return next(e)
    }
});




module.exports = router;