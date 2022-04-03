const errorHandler = require("../utils/errorHandler");
const users = require("../models/userModel");
const posts = require("../models/postModel");
const catchAsyncAwait = require("../middlewares/catchAsyncAwait");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const { post } = require("../routes/userRoute");
const cloudinary = require("cloudinary");

const register = catchAsyncAwait(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  let User = await users.findOne({ email });
  if (User) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
  });

  const user = await users.create({
    name,
    email,
    password,
    avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });

  const token = await user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, options).json({
    success: true,
    message: "User created successfully",
    user: user,
    token: token,
  });
});

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await users
    .findOne({ email })
    .select("+password")
    .populate("posts followers following");

  if (!user) {
    return next(new errorHandler(400, "user does not exist"));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new errorHandler(400, "Password does not match"));
  }
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 100),
    httpOnly: true,
  };

  const token = await user.getJWTToken();
  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
};

const logout = catchAsyncAwait(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "User logged out successfully",
  });
});

const updatePassword = catchAsyncAwait(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new errorHandler(400, "please provide all fields"));
  }

  const user = await users.findById(req.user._id).select("+password");

  const isPasswordMatch = await user.comparePassword(oldPassword);

  if (!isPasswordMatch) {
    return next(new errorHandler(400, "Old password does not match"));
  }

  if (newPassword !== confirmPassword) {
    return next(new errorHandler(400, "confirm password does not match"));
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "password updated successfully" });
});

const updateProfile = catchAsyncAwait(async (req, res, next) => {
  const user = await users.findById(req.user._id);
  const { name, email, avatar } = req.body;
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  if (avatar) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    user.avatar.public_id = myCloud.public_id;
    user.avatar.url = myCloud.secure_url;
  }
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "profile updated Successfully" });
});

const forgotPassword = catchAsyncAwait(async (req, res, next) => {
  const { email } = req.body;
  const user = await users.findOne({ email });

  if (!user) {
    return next(new errorHandler(400, "User not found"));
  }

  const resetToken = await user.generateResetToken();
  user.save({ validateBeforeSave: false });

  // const hostUrl = process.env.FRONTEND_URL;
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is ${resetPasswordUrl} \n\n if you have not requested , please ignore 
          \n\n regards Postbook`;

  try {
    await sendMail({
      email: email,
      subject: "Postbook Password Recovery Mail",
      message: message,
    });

    res
      .status(200)
      .json({ success: true, message: `Mail sent to ${email} successfully !` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save({ validateBeforeSave: true });

    return next(new errorHandler(500, error.message));
  }
});

const resetPassword = catchAsyncAwait(async (req, res, next) => {
  const resetToken = req.params.token;
  const { newPassword, confirmPassword } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await users
    .findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
    .select("+password");
  if (!user) {
    return next(new errorHandler(400, "Either token is invalid or expired"));
  }

  if (newPassword !== confirmPassword) {
    return next(new errorHandler(400, "confirm password does not match"));
  }

  user.password = confirmPassword;

  await user.save({ validateBeforeSave: true });

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 100),
    httpOnly: true,
  };

  const token = await user.getJWTToken();

  res
    .status(201)
    .cookie("token", token, options)
    .json({ success: true, message: "Password changed successfully!", token });
});

const myProfile = catchAsyncAwait(async (req, res, next) => {
  const me = await users
    .findById(req.user._id)
    .populate("posts followers following");

  res.status(200).json({ success: true, me });
});

const followUser = catchAsyncAwait(async (req, res, next) => {
  const userToFollow = await users.findById({ _id: req.params.id });
  const loggedInUser = await users.findById({ _id: req.user.id });

  if (!userToFollow) {
    return next(new errorHandler(400, "User not found"));
  }

  if (loggedInUser.following.includes(userToFollow._id)) {
    const indexOfFollowing = loggedInUser.following.indexOf(userToFollow._id);
    const indexOfFollower = userToFollow.followers.indexOf(loggedInUser._id);

    loggedInUser.following.splice(indexOfFollowing, 1);
    userToFollow.followers.splice(indexOfFollower, 1);

    await loggedInUser.save();
    await userToFollow.save();

    res.status(200).json({ success: true, message: "User Unfollowed" });
  } else {
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);
    await loggedInUser.save();
    await userToFollow.save();

    res.status(200).json({ success: true, message: "User followed" });
  }
});

const getMyPosts = catchAsyncAwait(async (req, res, next) => {
  const user = await users.findById(req.user._id);

  let Posts = [];
  for (let i = 0; i < user.posts.length; i++) {
    const post = await posts
      .findById(user.posts[i])
      .populate("likes comments.user owner");
    Posts.push(post);
  }
  res.status(200).json({ success: true, Posts });
});

const userPosts = catchAsyncAwait(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await users.findById(userId);

  const Posts = [];

  for (let i = 0; i < user.posts.length; i++) {
    const post = await posts
      .findById(user.posts[i])
      .populate("likes comments.user owner");
    Posts.push(post);
  }
  res.status(200).json({ success: true, Posts });
});

const userProfile = catchAsyncAwait(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await users
    .findById(userId)
    .populate("posts followers following");
  if (!user) {
    return next(new errorHandler(400, "user does not exits"));
  }

  res.status(200).json({ success: true, user });
});

const getAllUsersOnSearch = catchAsyncAwait(async (req, res, next) => {
  const Users = await users.find({
    name: {
      $regex: req.query.name,
      $options: "i",
    },
  });
  if (!Users) {
    return next(
      new errorHandler(400, `there is no user with name ${req.query.name} `)
    );
  }

  res.status(200).json({ success: true, Users });
});

const deleteMyAccount = catchAsyncAwait(async (req, res, next) => {
  const user = await users.findById(req.user._id);
  const followings = user.following;
  const followers = user.followers;
  const Posts = user.posts;
  const AllPosts = await posts.find();

  // delete followings
  for (let i = 0; i < followings.length; i++) {
    const followuser = await users.findById(followings[i]);
    const followuserFollower = followuser.followers;

    const index = followuserFollower.indexOf(req.user._id);

    followuserFollower.splice(index, 1);

    await followuser.save();
  }

  // dlete all followers
  for (let i = 0; i < followers.length; i++) {
    const followerFollowingUser = await users.findById(followers[i]);

    const followerfollowing = followerFollowingUser.following;

    const index = followerfollowing.indexOf(req.user._id);
    followerfollowing.splice(index, 1);

    await followerFollowingUser.save();
  }

  // delete all comments
  for (let i = 0; i < AllPosts.length; i++) {
    const post = await posts.findById(AllPosts[i]._id);

    for (let j = 0; j < post.comments.length; j++) {
      if (post.comments[j].user.toString() === req.user._id.toString()) {
        post.comments.splice(j, 1);
      }
    }
    await post.save();
  }

  // delete all likes

  for (let i = 0; i < AllPosts.length; i++) {
    const post = await posts.findById(AllPosts[i]._id);

    for (let j = 0; j < post.likes.length; j++) {
      if (post.likes[j].toString() === req.user._id.toString()) {
        post.likes.splice(j, 1);
      }
    }
    await post.save();
  }

  // delete all posts
  for (let i = 0; i < Posts.length; i++) {
    const Post = await posts.findById(Posts[i]);
    await Post.remove();
  }
  //delete the user

  await user.remove();
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, message: "profile deleted" });
});

module.exports = {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  followUser,
  getMyPosts,
  userPosts,
  myProfile,
  userProfile,
  getAllUsersOnSearch,
  deleteMyAccount,
};
