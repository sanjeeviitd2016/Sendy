import { Button, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import "./NewPost.css";
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {useAlert} from 'react-alert';
import {getMyPosts, newPost} from "../../actions/postAction"
import { clearErrors, loadUser } from "../../actions/userAction";
import { CLEAR_MESSAGE } from "../../constants/post";
import logo from "../../images/logo.jpg"


const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const alert= useAlert();

  const {error, message,loading}= useSelector(state=> state.like);


  const imageSubmitHandler = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload=() => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(newPost(caption,image))

    dispatch(loadUser())
    
  };

  useEffect(()=>{
      if(error){
          alert.error(error);
          dispatch(clearErrors())
      }
      if(message){
          navigate("/account")
          alert.success(message);
          dispatch({type:CLEAR_MESSAGE});
          

      }
  },[error,alert,message,dispatch])
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
      <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />
        <Typography>New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={imageSubmitHandler} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading}  type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
