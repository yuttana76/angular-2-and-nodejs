const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=>{
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,  DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req,res,next)=>{
    const post = req.body;
    console.log(post);

    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req,res,next)=>{
    const posts = [
        {
            id: "fjldsfjlsdjfl",
            title: "Title 1",
            content: "Content 1",
        },
        {
            id: "xxxxslflsfjlsklsfl",
            title: "Title 2",
            content: "Content 2",
        },
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;