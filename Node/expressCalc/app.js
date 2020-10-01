const express = require('express');
const MathModes = require('./mathFunc');
const ExpressError = require('./errorClass');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', (req, res, next) => {
    try{
        let nums = req.body.nums;
        let mode = req.route.path.slice(1);
        let answer = new MathModes(mode, nums);
        return res.json(answer.calculate(mode, nums));
    }
    catch(e){
        return next(e);
    }
})

app.get('/mode', (req, res, next) => {
    try{
        let nums = req.body.nums;
        let mode = req.route.path.slice(1);
        let answer = new MathModes(mode, nums);
        return res.json(answer.calculate(mode, nums));
    }
    catch(e){
        return next(e);
    }
})

app.get('/median', (req, res, next) => {
    try{ 
        let nums = req.body.nums;
        let mode = req.route.path.slice(1);
        let answer = new MathModes(mode, nums);
        return res.json(answer.calculate(mode, nums));
    }
    catch(e){
        return next(e);
    }
})

app.get('/all', (req, res, next) => {
    try{
        if(req.body.nums){
            let nums = req.body.nums;
            let maths = req.route.path.slice(1);
            let answer = new MathModes(maths, nums);
            return res.json(answer.doAllThree());
        }
        else{
            return res.json(answer.doAllThree());
        }
    }
    catch(e){
        return next(e);
    }
})

app.use((err, req, res) => {
    console.log(err);
    let status = err.status;
    let message = err.message;

    return res.status(status).json({
        error: {message, status}
    })
})

app.use((req, res, next) => {
    let e = new ExpressError('Not a valid route', 404);
    next(e);
})

app.listen(5000, () => {
    console.log('Listening on port:5000')
})