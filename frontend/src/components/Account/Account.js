import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../actions/postAction";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Typography ,Avatar,Dialog,Button} from "@mui/material";
import User from "../User/User";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {clearErrors, deleteMyAccount, logoutUser} from "../../actions/userAction"
import { useAlert } from "react-alert";
import { CLEAR_MESSAGE } from "../../constants/post";
import "../Post/Post.css"
import {loadUser} from "../../actions/userAction"

const Account = () => {
    const navigate= useNavigate()
  const { myPosts:posts, error, loading } = useSelector((state) => state.myPosts);
  const {user,error:userError,loading:userLoading}= useSelector(state=>state.user)
  const {message:likeMessage,error:likeError,loading:deleteloading} = useSelector(state=>state.like)


  const [followersToggle,setFollowersToggle]= useState(false)
  const [followingToggle,setFollowingToggle]= useState(false)
  const [deleteToggle,setDeleteToggle]= useState(false);
  const [deleteSureToggle, setDeleteSureToggle]= useState(false);

  const alert= useAlert();
  const logoutHandler= async(e)=>{
    e.preventDefault();
    await dispatch(logoutUser())
    alert.success('Logout Successfully')
    navigate("/login")
  }
 
  const dispatch = useDispatch();

  const deleteProfileHandler=(e)=>{
    e.preventDefault();
    dispatch(deleteMyAccount())
  }

  const deleteToggleHandler=()=>{
    setDeleteToggle(false);
    setDeleteSureToggle(false)
  }


  useEffect(()=>{
    dispatch(getMyPosts())
    // dispatch(loadUser())

},[dispatch])

  useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    if(userError){
        alert.error(error)
        dispatch(clearErrors())

    }
    if(likeError){
        alert.error(error)
        dispatch(clearErrors())
    }

    if(likeMessage){
        alert.success(likeMessage)
        dispatch(loadUser())
        dispatch({type:CLEAR_MESSAGE})
    }


  }, [dispatch,error,userError,alert,likeMessage,likeError]);

 
  return loading===true || userLoading===true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
          {posts && posts.length>0 ? 
            posts.map((post)=>(
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
              isAccount ={true}
              isDelete= {true}

            />
            )) :
          (
              <Typography>You have not post anything yet</Typography>
          )
          }
      </div>
      <div className="accountright">
      <Avatar className="avatar"
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography style={{font:"500 1.7vmax georgia"}}>Followers</Typography>
          </button>
          <Typography style={{font:"300 1.7vmax georgia"}}>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography style={{font:"500 1.7vmax georgia"}}>Following</Typography>
          </button>
          <Typography style={{font:"300 1.7vmax georgia"}}>{user.following.length}</Typography>
        </div>
        <div>
          <Typography style={{ padding: "0.5vmax 1vmax" ,font:"500 1.7vmax georgia"}}>Posts</Typography>
          <Typography style={{font:"300 1.7vmax georgia"}}>{user.posts.length}</Typography>
        </div>

        <Link to="/update/profile" style={{padding:"0.5vmax 3.3vmax"}} variant="contained">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button variant="contained" onClick={logoutHandler} style={{margin:"2vmax 1vmax"}}>
          Logout
        </Button>
        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={()=> setDeleteToggle(!deleteToggle)}
        >
          Delete My Account
        </Button>      

        <Dialog open={followersToggle} onClose={()=> setFollowersToggle(!followersToggle)}>
         <div className="DialogBox">
         <Typography style={{textAlign:"center"}}> Followers</Typography>
          {
              user.name && user.followers.length >0 ? (
                  user.followers.map(item=>(
                      <User key={item._id} userId={item._id} name={item.name} avatar={item.avatar.url} />
                  ))
              ):
              (
                <Typography style={{ margin: "2vmax" }}>
                  You have no followers
                </Typography>
              )
          }
         </div>
        </Dialog>

        <Dialog open={followingToggle} onClose={()=> setFollowingToggle(!followingToggle)}>
         <div className="DialogBox">
         <Typography style={{textAlign:"center"}}> Following</Typography>
          {
              user.name && user.following.length >0 ? (
                  user.following.map(item=>(
                      <User key={item._id} userId={item._id} name={item.name} avatar={item.avatar.url} />
                  ))
              ):
              (
                <Typography style={{ margin: "2vmax" }}>
                  You're not following anyone
                </Typography>
              )
          }
         </div>
        </Dialog>

        <Dialog open={deleteToggle} onClose={()=> setDeleteToggle(!deleteToggle)}>
          <div className="Dialogbox">
              <Typography> Do you want to delete your profile ?</Typography>
              <Button onClick={()=>setDeleteSureToggle(true)}> Yes </Button>
              <Button onClick={()=>setDeleteToggle(false)}>No</Button>
          </div>
        </Dialog> 
        <Dialog open={deleteSureToggle} onClose={()=>setDeleteSureToggle(!deleteSureToggle)}>

          <div className="Dialogbox">
              <Typography> Are you really sure ?</Typography>
              <Button onClick={deleteProfileHandler} disabled={deleteloading}>
                Yess
              </Button>
              <Button onClick={deleteToggleHandler}> Nope</Button>
          </div>

        </Dialog> 
      </div>


    </div>
  );
};

export default Account;
