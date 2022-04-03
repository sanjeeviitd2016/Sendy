import React, { useEffect } from "react";
import Post from "../Post/Post.js";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getAllUsers,
  getFollowingPosts,
} from "../../actions/userAction.js";
import Loader from "../Loader/Loader.js";
import { Typography } from "@mui/material";
import User from "../User/User.js";
import { CLEAR_ERRORS } from "../../constants/user.js";
import { CLEAR_MESSAGE } from "../../constants/post.js";

const Home = () => {
  const dispatch = useDispatch();
  const alert= useAlert();

  const { posts, loading, error } = useSelector((state) => state.posts);
  const {
    loading: userLoadind,
    error: userError,
    users,
  } = useSelector((state) => state.allUsers);


  const {loading:likeLoading,success,message,error:likeError}= useSelector(state=> state.like)
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(likeError){
      alert.error(likeError);
      dispatch(clearErrors())
    }

      if(message){
        alert.success(message);
        dispatch({type:CLEAR_MESSAGE})
      }
  }, [error,likeError,dispatch,alert,message]);
  return loading === true || userLoadind === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.images[0].url}
              likes={post.likes}
              comments={post.comments}
              ownerName={post.owner.name}
              ownerImage={post.owner.avatar.url}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography varient="h6">No Posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((item) => (
            <User key={item._id} userId={item._id} name={item.name} avatar={item.avatar.url} />
          ))
        ) : (
          <Typography> No users yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
