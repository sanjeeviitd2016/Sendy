import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import User from "../User/User";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  ChatBubble,
  Delete
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, getLikeUsers, getMyPosts, updateCaption } from "../../actions/postAction";
import { useAlert } from "react-alert";
import { clearErrors, getFollowingPosts } from "../../actions/userAction";
import { CLEAR_MESSAGE } from "../../constants/post";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount=false,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [deleteToggle,setDeleteToggle]= useState(false);

  const { user } = useSelector((state) => state.user);
  const {error,loading,message}= useSelector(state=> state.like)



  const handleLiked = async () => {
    setLiked(!liked);
    await dispatch(getLikeUsers(postId));
    if(isAccount){
      dispatch(getMyPosts())
    }
    else{
      dispatch(getFollowingPosts())
    }
  };

  const addCommentHandler = async(e)=>{
        e.preventDefault();
        await dispatch(addCommentOnPost(commentValue,postId))

        if(isAccount){
          dispatch(getMyPosts())
        }
        else{
          dispatch(getFollowingPosts())
        }
  }
const updateCaptionHandler= async(e)=>{
  e.preventDefault();
  await dispatch(updateCaption(captionValue,postId))
  if(isAccount){
    dispatch(getMyPosts())
  }
  else{
    dispatch(getFollowingPosts())
  }
  
}

const deletePostHandler=(e)=>{
  e.preventDefault();
  dispatch(deletePost(postId))
}

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(message){
      alert.success(message);
      // dispatch({type:CLEAR_MESSAGE})
      // dispatch(getMyPosts())
    }
  },[error,dispatch,alert])
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button  onClick={()=>setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="postImage" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "0vmax 1vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography> {likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLiked}>
          {" "}
          {liked ? (
            <Favorite style={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )}{" "}
        </Button>

        <Button onClick={() => setCommentToggle(true)}>
          {" "}
          {comments.length>0 ? (<ChatBubble style={{color:'red'}} />) : (<ChatBubbleOutline />)}
        </Button>
        <Button style={{color:"red"}} onClick={()=> setDeleteToggle(!deleteToggle)}>{isDelete ? <Delete /> : null}</Button>
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className= "commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />
            <Button type='submit'>
              Add
            </Button>
          </form>
          {
            comments.length >0 ? comments.map((item)=>(
              <CommentCard 
              userId= {item.user._id}
              userName= {item.user.name}
              avatar= {item.user.avatar.url}
              comment= {item.comment}
              commentId= {item._id}
              postId= {postId}
              key ={item._id}
              isAccount= {isAccount}
              />
            )) :
            <Typography > No Comments yet</Typography>
          }

        </div>
      </Dialog>
      <Dialog open={captionToggle} onClose={()=>setCaptionToggle(!captionToggle)}>
      
      <div className="DialogBoxCap">
      <Typography variant="h4">Update Caption</Typography>
      <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
      </div>
      </Dialog>

      <Dialog open={deleteToggle} onClose={()=>setDeleteToggle(!deleteToggle)}>

            <div className="Dialogbox">
                  <Typography>Are you sure to delete this Post?</Typography>
                  <Button onClick={deletePostHandler}>Yes</Button>
                  <Button onClick={()=>setDeleteToggle(false)}>No</Button>
            </div>
      </Dialog>
    </div>
  );
};

export default Post;
