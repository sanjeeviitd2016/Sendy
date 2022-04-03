import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Typography,Button} from '@mui/material';
import { Link,useNavigate,useParams } from 'react-router-dom';
import "./ResetPassword.css"
import { clearErrors } from '../../actions/userAction';
import { CLEAR_MESSAGE } from '../../constants/post';
import { resetPassword } from '../../actions/userAction';
import logo from "../../images/logo.jpg"


const ResetPassword = () => {

    const [newPassword,setNewPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("")
    const dispatch= useDispatch();
    const alert= useAlert();
    const navigate= useNavigate();
    const {token}= useParams();

    const {error,loading,message}= useSelector(state=> state.like)

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(resetPassword(token,newPassword,confirmPassword))
        

    }

    useEffect(async()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(message){
            alert.success(message);
            await dispatch({type:CLEAR_MESSAGE})
            navigate("/login")
        }
    })
  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        {/* <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography> */}
        <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />
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

        <Link to="/login">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  )
}

export default ResetPassword