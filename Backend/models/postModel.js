const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  caption: {
    type: String,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      comment: {
        type: String,
        required: [true, "Please Enter Comment"],
      },
    },
  ],
});

module.exports = mongoose.model("posts", postSchema);
