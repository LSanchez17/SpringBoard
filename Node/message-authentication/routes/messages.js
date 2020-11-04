const Router = require('express').Router;
const {ensureLoggedIn} = require('../middleware/auth');
const Message = require('../models/message');
const ExpressError = require('../expressError');

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

//Middleware we want run on the route should be called before the route logic
//ensuring we pass the middleware logic we need or we fail the route itself
router.get('/:id', ensureLoggedIn, async(req, res, next) => {
    try{
        let user = req.user.username;
        let messages = await Message.get(req.params.id);

        if(messages.to_user.username !== user && messages.from_user.username !== user){
            throw new ExpressError('No readable mssages', 401);
        }

        return res.json({"message": messages});
    }
    catch(e){
        return next(e);
    }
})



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/', ensureLoggedIn, async(req, res, next) => {
    try{
        let user = req.user.username;
        let successfulMessage = await Message.create(
            {from_username: user, 
             to_username: req.body.to_username, 
             body: req.body.body
            });
        
        if(successfulMessage){
            return res.json({'Notice': 'Message was successfully sent'});
        }
    }   
    catch(e){
        return next(e);
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 //seems we have to get the actual message to then be able to mark it as read
 //if user is loggedIn, they should be able to simple read/fetch in one method
router.post('/:id/read', ensureLoggedIn, async(req, res, next) => {
    try{
        let user = req.user.username;
        let message = await Message.get(req.params.id);

        if(message.to_user.username !== user){
            throw new ExpressError('Cannot read this message', 401);
        }
        
        let result = await Message.markRead(req.params.id);

        if(result){
            return res.json({'Message': 'Read'});
        }
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;