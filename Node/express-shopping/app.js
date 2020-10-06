const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./shopRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/items', itemRoutes);

app.use((req, res, next) => {
    let e = new ExpressError.CustomErrors('Not a valid route', 404);
    next(e);
});

app.use((err, req, res) => {
    let statusCode = err.errorCode;
    let message = err.message;

    return res.status(statusCode).json({
        error: {message, statusCode}
    })
});

app.listen(5000, () => {
    console.log('Server running on PORT:5000');
});

module.exports = { app }