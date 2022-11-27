'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sanitizer  = require('express-html-sanitizer')
const config = require('./config');
//const db = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//var dbx = {};

const event_router = require('./routes/event-router');
const user_router = require('./routes/user-router');
const comment_router = require('./routes/comment-router');

const debug = require('./routes/debug');
const sanitizeReqBody = sanitizer(config.sanitizer_options);

global.__basedir = __dirname;


async function main() {
    app.use(cors({"origin": true}));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(sanitizeReqBody);

    //dbx = await db.GetDatabase();

    app.use('/', debug);
    app.use('/api/user', user_router);
    app.use('/api/event', event_router);
    //app.use('/api/comment', comment_router);

    app.use(express.static('dist', { index: 'index.html' }));

    app.get('/*', function(req, res) {
        res.sendFile("index.html", { root: `${__dirname}/dist` });
    });

    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.listen(config.app.port, function () {
        console.log(`App listens  : http://localhost:${config.app.port}`);
    });
}
main();

exports.app = app;
//exports.db = dbx;