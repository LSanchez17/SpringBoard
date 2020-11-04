/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

const jwt = require('jsonwebtoken');
const Router = require('express').Router;
const user = require('../models/user');
const {SECRET_KEY} = require('../config');
const ExpressErrors = require('../expressError');

const router = new Router();

router.post('/login', async (req, res, next) => {
    //Login, and check user athentication
    try{
        //grab username and password from body submission
        let {username, password} = req.body;
        //Check authentication
        if(await user.authenticate(username, password)) {
            //send the signed webtoken with the username, and secret key signature
            let token = jwt.sign({username}, SECRET_KEY);
            user.updatedLoginTimestamp(username);

            return res.json({token});
        }
        else{
            throw new ExpressErrors('Invalid credentials', 400);
        }
    }
    catch(e){
        return next(e);
    }
})

router.post('/register', async(req, res, next) => {
    try{
        //send entire request body(should have usr, pss, frst, lst, phon#) to register method
        let {username} = user.register(req.body);
        //sign token with username object that we get returned
        let token = jwt.sign({username}, SECRET_KEY);
        //update that timestamp again
        user.updateLoginTimestamp(username)

        //return signed token
        return res.json({token})
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;