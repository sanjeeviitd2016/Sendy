import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./CommentCard.css";
import { deleteComment } from "../../actions/postAction";
import { getFollowingPosts } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({
  userId,
  userName,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const deleteCommentHandle = async () => {
    await dispatch(deleteComment(postId, commentId));
    dispatch(getFollowingPosts());
  };
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={userName} />
        <Typography style={{ minWidth: "6vmax" }}>{userName}</Typography>
      </Link>
      <Typography  style={{marginLeft:"1vmax"}}>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
