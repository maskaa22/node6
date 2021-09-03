const express = require('express');
const mongoose = require('mongoose');

const {PORT} = require('./config/variables');
const {userRouter, registrationRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/apr-2021');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/registration', registrationRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App lesten', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not Found'
    })
}

function _mainErrorHandler (err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        })
}