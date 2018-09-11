const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// Mongo Shell here!
// /Users/macbookair/Projects/mongodb-shell/bin
mongoose.connect('mongodb+srv://someone:PGSsnKkkxbgN8zAt@cluster0-6vwxi.mongodb.net/test?retryWrites=true')
    .then(() => {
        console.log('Connection DB. successful');
    })
    .catch(() => {
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
        "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT,  DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
