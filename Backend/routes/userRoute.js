const express = require("express");
const {
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
} = require("../controllers/userController");
const isAuthentication = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthentication, myProfile);
router.get("/user/profile/:userId",isAuthentication,userProfile)
router.get("/users",isAuthentication,getAllUsersOnSearch)
router.post("/update/password", isAuthentication, updatePassword);
router.post("/update/profile", isAuthentication, updateProfile);
router.post("/forgot/password", forgotPassword);
router.post("/reset/password/:token", resetPassword);
router.get("/follow/user/:id", isAuthentication, followUser);
router.get("/my/posts", isAuthentication, getMyPosts);
router.get("/user/posts/:userId", isAuthentication, userPosts);
router.delete("/me/delete",isAuthentication, deleteMyAccount)

module.exports = router;
