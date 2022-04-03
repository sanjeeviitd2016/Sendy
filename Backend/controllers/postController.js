const posts = require("../models/postModel");
const users = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncAwait = require("../middlewares/catchAsyncAwait");
const { post } = require("../routes/postRoute");
const cloudinary= require('cloudinary');

const createPost = catchAsyncAwait(async (req, res, next) => {
  const { caption,images } = req.body;

  const myCloud= await cloudinary.v2.uploader.upload(images,{
    folder:'posts'
  })

  const post = await posts.create({
    caption,
    owner: req.user._id,
    images: [
      {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    ],
  });

  const user = await users.findById(req.user._id);

  user.posts.unshift(post._id);
  await user.save();

  res.status(200).json({ success: true, message: "post created", post });
});

const deletePost = catchAsyncAwait(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await posts.findById({ _id: postId });

  if (!post) {
    return next(new errorHandler(400, "post does not exits"));
  }
  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new errorHandler(400, "Unautharized User, you cannot delete"));
  }
  const user = await users.findById(req.user._id);

  await post.remove();

  if (user.posts.includes(post._id)) {
    const indexOfPost = user.posts.indexOf(post._id);
    user.posts.splice(indexOfPost, 1);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "post deleted successfully!" });
  } else {
    return next(new errorHandler(400, "user doesnt have this post"));
  }
});

const likeUnlikePost = catchAsyncAwait(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await posts.findById(postId);

  if (!post) {
    return next(new errorHandler(400, "post does not exits"));
  }

  if (post.likes.includes(req.user._id)) {
    const userLikeIndex = post.likes.indexOf(req.user._id);

    post.likes.splice(userLikeIndex, 1);
    await post.save();
    res.status(200).json({ success: true, message: "post unliked" });
  } else {
    post.likes.unshift(req.user._id);
    await post.save();
    res.status(200).json({ success: true, message: "post liked" });
  }
});

const postOfFollowing = catchAsyncAwait(async (req, res, next) => {
  const user = await users.findById(req.user._id);

  const post = await posts
    .find({
      owner: {
        $in: user.following,
      },
    })
    .populate("owner likes comments.user");

  res.status(200).json({ success: true, post });
});

const updateCaption = catchAsyncAwait(async (req, res, next) => {
  const postId = req.params.postId;
  const { caption } = req.body;
  const post = await posts.findById(postId);


  if (!post) {
    return next(new errorHandler(400, "post does not found"));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new errorHandler(400, "unauthorized owner"));
  }

  post.caption = caption;
  await post.save();

  res
    .status(200)
    .json({ success: true, message: "caption updated successfully", post });
});

const commentOnPost = catchAsyncAwait(async (req, res, next) => {
  const postId = req.params.postId;
  const { Comment } = req.body;

  const post = await posts.findById(postId);

  if (!post) {
    return next(new errorHandler(400, "Post does not found"));
  }

  let commentIndex = -1;

  post.comments.forEach((item, index) => {
    if (item.user.toString() === req.user._id.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex !== -1) {
    post.comments[commentIndex].comment = Comment;
    await post.save();
    return res.status(200).json({ success: true, message: "comment updated", post });
  }

  post.comments.unshift({
    user: req.user._id,
    comment: Comment,
  });
  await post.save();

  res.status(200).json({ success: true, message: "comment added", post });
});


const deleteComment = catchAsyncAwait(async(req,res,next)=>{

  const postId= req.params.postId;
  const post= await posts.findById(postId);
  const {commentId}= req.body

  if (!post) {
    return next(new errorHandler(400, "Post does not found"));
  }

  if (post.owner.toString() === req.user._id.toString()){
  if(commentId === undefined){
      return next(new errorHandler(400,'commentId is required'))
    }

    post.comments.forEach( (item,index)=>{
      if(item._id.toString()=== commentId.toString() ){
        post.comments.splice(index,1)
      }
    })
    await post.save();
    return res.status(200).json({success:true, message:'Comment Deleted',post})
  }

post.comments.forEach((item,index)=>{
  if(item.user.toString()===req.user._id.toString()){
    post.comments.splice(index,1)   
  }
})
await post.save();
return res.status(200).json({success:true, message:'Comment Deleted',post})

})


module.exports = {
  createPost,
  deletePost,
  likeUnlikePost,
  postOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment
};
