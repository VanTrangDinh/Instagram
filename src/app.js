const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const createError = require('http-errors')
const logEvents = require('./helpers/log.events');
const {v4: uuid} = require('uuid')
const bodyparser = require('body-parser');

const app = express();

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//init database
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
//checkOverload()
//init route
app.use('', require('./routes/index'))
//hanling error
app.use((req, res, next) => {
    next(createError(404, 'Not found'))
})
app.use((err, req, res, next) => {
    logEvents(`IdError----${uuid()}----${req.url}----${req.methods}----${err.message}`)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        message: err.message
    })
})
module.exports = app;
