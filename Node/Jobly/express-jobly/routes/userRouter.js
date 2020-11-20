const express = require('express');
const Users = require('../models/userModel');
const {authenticateUser, validTokenAndUser} = require('../middleware/authenticate');
const router = new express.Router();

router.get('/', authenticateUser, async (req, res, next) => {
    try{
        let allUser = await Users.getAll();
        // console.log(allUser)
        return res.json({user: [allUser]});
        // return res.json({message: 'No users able to be retrieved'});
    }
    catch(e){
        return next(e);
    }
})

router.get('/:username', authenticateUser, async (req, res, next) => {
    try{
        let singularUser = await Users.getOne(req.params.username);
        
        return res.json({user: singularUser});
        // return res.json({message: `${req.params.username} cannot be retrieved`});
    }
    catch(e){
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    try{
        let createdUser = await Users.createUser(req.body);
        if(createdUser){
            let signedToken = await authenticateUser;
            return res.json({user: createdUser, token: signedToken});
        }
        return res.json({message: `User cannot be created`});
    }
    catch(e){
        return next(e);
    }
})

router.patch('/:username', validTokenAndUser, async (req, res, next) => {
    try{
        let updatedUser = await Users.updateUser(req.params.username, req.body);
        if(updatedUser){
            return res.json({user: updatedUser});
        }
        return res.json({message: `${req.params.username} cannot be updated`});
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:username', validTokenAndUser, async (req, res, next) => {
    try{
        let deletedUser = await Users.deleteUser(req.params.username);
        if(deletedUser){
            return res.json({message: `${req.params.username} has been deleted`});
        }
        return res.json({message: `${req.params.username} unable to be deleted`});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;