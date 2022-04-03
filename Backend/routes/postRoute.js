
const express= require('express');
const router= express.Router();
const isAuthenticated = require('../middlewares/auth')
const {createPost, deletePost,likeUnlikePost, postOfFollowing, updateCaption, commentOnPost, deleteComment} = require("../controllers/postController")



router.post('/post/upload',isAuthenticated, createPost);
router.delete("/post/delete/:postId",isAuthenticated,deletePost);
router.get("/post/like/:postId",isAuthenticated,likeUnlikePost);
router.get("/posts",isAuthenticated, postOfFollowing);
router.post('/post/caption/:postId',isAuthenticated,updateCaption);
router.post('/post/comment/:postId',isAuthenticated,commentOnPost);
router.post("/post/comment/delete/:postId",isAuthenticated,deleteComment)



module.exports= router;