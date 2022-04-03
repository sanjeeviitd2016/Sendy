const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto= require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: [true, "User already Exits"],
    validate: [validator.isEmail, "Please enter valid Email"],
  },
  password:{
    type: String,
    required: [true, "Please enter Password"],
    minLength: [5, "Password must have atleast 5 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.getJWTToken = async function () {
  
  const privateKey =
    process.env.PRIVATE_KEY 
  const expireTime = process.env.TOKEN_EXPIRE_TIME || "2000h";

  return jwt.sign({ id: this._id }, privateKey, {
    expiresIn: expireTime,
  });
};

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateResetToken= async function(){

 const resetToken= crypto.randomBytes(20).toString('hex');
 this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire= Date.now() + 15*60*60*1000
return resetToken;
}

module.exports = mongoose.model("users", userSchema);