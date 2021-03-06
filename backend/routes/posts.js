const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

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

router.post("",checkAuth,multer({storage: storage}).single('image') ,(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
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
router.put("/:id",checkAuth,multer({storage: storage}).single('image'), (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, creator:req.userData.userId }, post).then(result => {
        console.log(result);
        if(result.nModified > 0 ){
          res.status(200).json({ message: 'Update successful!' });
        }else {
          res.status(401).json({ message: 'Not Authorized!' });
        }

    });
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();

    if( pageSize && currentPage ){
      postQuery
        .skip(pageSize * (currentPage -1))
        .limit(pageSize)
    }
    postQuery.find().then(document => {
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

router.delete("/:id",checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator:req.userData.userId }).then(result => {
          if(result.n > 0 ){
            res.status(200).json({ message: 'Update successful!' });
          }else {
            res.status(401).json({ message: 'Not Authorized!' });
          }
    });
});

module.exports = router;
