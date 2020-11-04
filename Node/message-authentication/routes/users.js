const Router = require('express').Router;
const user = require('../models/user');
const {ensureLoggedIn, ensureCorrectUser} = require('../middleware/auth');
const router = new Router();
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', async(req, res, next) => {
    try{
        let results = await user.all();
        
        return res.json({results});
    }
    catch(e){
        return next(e);
    }
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', async(req, res, next) => {
    try{
        let results = await user.get(req.params.username);

        return res.json({results});
    }
    catch(e){
        return next(e);
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', async(req, res, next) => {
    try{
        let results = await user.messagesTo(req.params.username);

        return res.json({results});
    }
    catch(e){
        return next(e);
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/from', async(req, res, next) => {
    try{
        let results = await user.messagesFrom(req.params.username);

        return res.json({results});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;