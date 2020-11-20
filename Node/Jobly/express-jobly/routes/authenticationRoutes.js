const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');
const {makeToken} = require('../helpers/makeTokens');

router.post('/login', async (req, res, next) => {
    //authenticates user,    
    //return JSON web token that is signed with the following info
    //username and is_admin
    try{
        //check if user is authentic in user model.
        const authUser = await User.verifyLogin(req.body);
        //If user is authentic, send their user data(username,admin status)
        //to create a signed JSON token
        const tokenSpawn = makeToken(authUser);
        return res.json({token: tokenSpawn});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;