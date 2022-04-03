import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Typography,Button } from '@mui/material';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { CLEAR_MESSAGE } from '../../constants/post';
import "./ForgotPassword.css"
import logo from "../../images/logo.jpg"

const ForgotPassword = () => {
    const dispatch= useDispatch();
    const alert= useAlert();
    const [email,setEmail]= useState("");

    const {loading,error,message}= useSelector(state=> state.like)

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(message){
            alert.success(message);
            dispatch({type:CLEAR_MESSAGE})
        }
    },[error,message,dispatch,alert])
  return (
    <div className="forgotPassword">
    <form className="forgotPasswordForm" onSubmit={submitHandler}>
      {/* <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography> */}

<img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />

      <input
        type="email"
        placeholder="Email"
        required
        className="forgotPasswordInputs"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Send Email
      </Button>
    </form>
  </div>
  )
}

export default ForgotPassword