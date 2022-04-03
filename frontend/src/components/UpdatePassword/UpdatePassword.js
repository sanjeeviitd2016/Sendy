import React, { useEffect, useState } from 'react';
import { Typography,Button } from '@mui/material';
import "./UpdatePassword.css"
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import { navigate, useNavigate } from 'react-router-dom';
import { CLEAR_MESSAGE } from '../../constants/post';
import logo from "../../images/logo.jpg"

const UpdatePassword = () => {

const dispatch= useDispatch();
const alert= useAlert();
const navigate= useNavigate();
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword]= useState("");

const {error,loading,message}= useSelector(state=>state.like)

const submitHandler=async(e)=>{
    e.preventDefault();

    dispatch(updatePassword(oldPassword,newPassword,confirmPassword))

}

useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    if(message){
        alert.success(message)
        dispatch({type:CLEAR_MESSAGE})
        navigate('/account')
    }
},[alert,error,message,dispatch])



  return (
    loading ? <Loader/> :
    <div className="updatePassword">
    <form className="updatePasswordForm" onSubmit={submitHandler}>
      {/* <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography> */}
      <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />

      <input
        type="password"
        placeholder="Old Password"
        required
        value={oldPassword}
        className="updatePasswordInputs"
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        required
        className="updatePasswordInputs"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

        <input
        type="password"
        placeholder="Confirm Password"
        required
        className="updatePasswordInputs"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button  type="submit">
        Change Password
      </Button>
    </form>
  </div>
  )
}

export default UpdatePassword