const path = require("path");
const express = require('express');
const helmet = require('helmet')
var compression = require('compression');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

var logger = require('./config/winston');

const app = express();
app.use(helmet())
app.use(compression());

app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))

// Mongo Shell here!
// /Users/macbookair/Projects/mongodb-shell/bin
mongoose.connect('mongodb+srv://someone:PGSsnKkkxbgN8zAt@cluster0-6vwxi.mongodb.net/test?retryWrites=true')
    .then(() => {
        console.log('Connection DB. successful');
    })
    .catch(() => {
        logger.info( `Connection DB. fail ! - ${require.originalUrl} - ${require.ip} `);
        
        console.log('Connection DB. fail !');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT,  DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
