const { SECRET_KEY } = require('../config');;
const jwt = require('jsonwebtoken');


//Authenticates user, send back signed token
//since this will be a middleware function, we have access to req, res, next
//make sure user is signed and verified
const authenticateUser = (req, res, next) => {
    try{
        let tokenExists = req.body._token || req.query._token;

        //decodes token with secret_key as a key(gives username and isadmin)
        let token = jwt.verify(tokenExists, SECRET_KEY);
        //stores username into a local storage it seems?
        res.locals.username = token.username;
        
        return next() //proceed to route logic
    }
    catch(e){
        return next(e);
    }
}

const isAdminCheck = (req, res, next) => {
    try{
        let tokenExists = req.body._token;

        let token = jwt.verify(tokenExists, SECRET_KEY);
        res.locals.username = token.username;

        if(token.is_admin){
            return next();
        }

        throw new Error();
    }
    catch(e){
        return next(e);
    }
}

const validTokenAndUser = (req, res, next) => {
    try{
        let tokenExists = req.body._token;

        let token = jwt.verify(tokenExists, SECRET_KEY);
        res.locals.username = token.username;

        //if the user in the req matches the signed token we are good
        if(token.username === req.params.username){
            return next();
        }

        throw new Error();
    }
    catch(e){
        return next(e);
    }
}

module.exports = {authenticateUser, isAdminCheck, validTokenAndUser};