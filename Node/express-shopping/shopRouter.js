const express = require('express');
const newStore = require('./middlewareShop');
const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        let items = newStore.getAllItems();
        res.send(items);
    }
    catch(e){
        return next(e);
    }
});

router.get('/:name', (req, res, next) => {
    try{
        let individualItem = newStore.getOneItem(req.params.name);
        res.send(individualItem);
    }
    catch(e){
        return next(e);
    }
});

router.post('/', (req, res, next) => {
    try{
        let addedItem = newStore.addItem(req.body);
        res.send(addedItem);
    }
    catch(e){
        return next(e);
    }
});

router.patch('/:name', (req, res, next) => {
    try{
        let updatedItem = newStore.updateItem(req.body);
        res.send(updatedItem);
    }
    catch(e){
        return next(e);
    }
});

router.delete('/:name', (req, res, next) => {
    try{
        let deletedItem = newStore.deleteItem(req.params.name);
        res.send(deletedItem);
    }
    catch(e){
        return next(e);
    }
});

module.exports = router