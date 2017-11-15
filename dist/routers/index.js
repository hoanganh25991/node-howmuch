'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _router = _express2.default.Router();

_router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

const router = exports.router = _router;