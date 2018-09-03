const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new  Error("Invalid mime type.");
        if( isValid ) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext );

    }   
});

router.post("",multer({storage: storage}).single('image') ,(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + 'images' + requ.file.filename
    });
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfully',
                post:  {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        });
});

//UPDATE
router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Update successful!' });
    });
});

router.get("", (req, res, next) => {
    Post.find().then(document => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: document
        });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post delted !" });
    });
});

module.exports = router;