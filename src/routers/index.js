import express from 'express'
const _router = express.Router();

_router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
})

export const router = _router