
import express from 'express'
import bodyParser from 'body-parser'
import {router} from "./routers/index"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
app.use('/api', router);

module.exports = app