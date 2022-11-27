var express = require('express');
var debug = express.Router();

debug.post('/*', function (req, res, next) {
    console.log(`\x1b[35m[${(new Date()).toUTCString()}]\x1b[0m POST: ${req._parsedUrl._raw}`);
    next();
})
debug.get('/*', function (req, res, next) {
    console.log(`\x1b[36m[${(new Date()).toUTCString()}]\x1b[0m GET: ${req._parsedUrl._raw}`);
    next();
})
debug.put('/*', function (req, res, next) {
    console.log(`\x1b[34m[${(new Date()).toUTCString()}]\x1b[0m PUT: ${req._parsedUrl._raw}`);
    next();
})
debug.delete('/*', function (req, res, next) {
    console.log(`\x1b[31m[${(new Date()).toUTCString()}]\x1b[0m DELETE: ${req._parsedUrl._raw}`);
    next();
})

module.exports = debug;