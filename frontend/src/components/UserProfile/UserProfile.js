import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getUsePosts } from "../../actions/postAction";
import { Navigate, useParams } from "react-router-dom";
import Post from "../Post/Post";
import { Typography, Avatar, Button, Dialog } from "@mui/material";
import Loader from "../Loader/Loader";
import "../Account/Account.css";
import { clearErrors, doUserFollow, loadUser, userProfile } from "../../actions/userAction";
import User from "../User/User";
import { CLEAR_MESSAGE } from "../../constants/post";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { userId } = useParams();
  const { error, posts, loading } = useSelector((state) => state.userPosts);
  const {
    user,
    error: userError,
    loading: userLoading,
  } = useSelector((state) => state.userProfile);

  const {
    error: followError,
    message,
    loading: followloading,
  } = useSelector((state) => state.like);

  const { user: me } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);

  const followHandler = async (e) => {
    e.preventDefault();

    await dispatch(doUserFollow(userId));
    setFollowing(!following);
    dispatch(userProfile(userId));
  };

  useEffect(() => {
    dispatch(getUsePosts(userId));
    dispatch(userProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user && user._id) {
      user.followers.forEach((element) => {
        if (element._id === me._id) {
          setFollowing(true);
        }
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (followError) {
      alert.error(followError);
      dispatch(clearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(loadUser())
      dispatch({ type:CLEAR_MESSAGE });
    }
  }, [alert, error, message, followError, userError, dispatch]);


  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
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
              isAccount={false}
              isDelete={false}
            />
          ))
        ) : (
          <Typography> No posts</Typography>
        )}
      </div>
      <div className="accountright">
        {user.avatar && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div>
              <Button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography style={{font:"300 1.5vmax georgia", color:'black'}}>Followers</Typography>
              </Button>
              <Typography style={{font:"300 1.5vmax georgia"}}>{user.followers.length}</Typography>
            </div>
            <div>
              <Button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography style={{font:"300 1.5vmax georgia", color:'black'}}>Following</Typography>
              </Button>
              <Typography style={{font:"300 1.5vmax georgia"}}> {user.following.length}</Typography>
            </div>
            <div>
              <Typography style={{font:"300 2vmax georgia"}}>Posts</Typography>
              <Typography style={{font:"300 2vmax georgia"}}> {user.posts.length}</Typography>
            </div>

            <Button
              variant="contained"
              style={{ background: following ? "red" : "" ,marginTop:"2vmax"}}
              onClick={followHandler}
              disabled={followloading}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
          <Typography style={{textAlign:"center"}}> Followers</Typography>
          {user.name && user.followers.length > 0 ? (
            user.followers.map((item) =>  <User key={item._id} userId={item._id} name={item.name} avatar={item.avatar.url} />)
          ) : (
            <Typography> No Followers</Typography>
          )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
          <Typography style={{textAlign:"center"}}> Following</Typography>
          {user.name && user.following.length > 0 ? (
            user.following.map((item) =>  <User key={item._id} userId={item._id} name={item.name} avatar={item.avatar.url} />)
          ) : (
            <Typography> User does not follow anyone</Typography>
          )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
