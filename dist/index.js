'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require("./routers/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
app.use('/api', router);

module.exports = app;