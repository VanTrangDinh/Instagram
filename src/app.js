const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const logEvents = require('./helpers/log.events');
const { v4: uuid } = require('uuid');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//init database
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
//checkOverload()
//init route
app.use('', require('./routes/index'));
//hanling error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    logEvents(`IdError----${uuid()}----${req.url}----${req.method}----${error.message}`);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    });
});
module.exports = app;
