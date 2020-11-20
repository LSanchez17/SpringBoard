const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const createNewToken = (user) => {
    //User is an object with properties of username, is_admin
    //signs token, returns it.
    let dataObj = {
        username: user.username,
        is_admin: user.is_admin
    }

    return jwt.sign(dataObj, SECRET_KEY);
}

module.exports = createNewToken;