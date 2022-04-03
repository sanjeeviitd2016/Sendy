import "./Login.css"
import { Typography, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { login } from "../../actions/userAction";
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import logo from "../../images/logo.jpg"

const Login = () => {

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const dispatch= useDispatch();
    const alert= useAlert();
    const navigate= useNavigate();

    const loginHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    }
    const {error,success}= useSelector(state=>state.user)

    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(success){
            navigate("/")
            alert.success('Logged in Successfully')
        }
    },[error,success,alert])

  return (
    <div className="login">
        <form className="loginForm" onSubmit={loginHandler}>
            {/* <Typography variant="h3" style={{ padding: "1.7vmax" }}>
          Postbook
        </Typography> */}
        <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />
            <input 
            type='email'
            placeholder="Enter email"
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <input type='password' 
            placeholder="Enter password"
            required
            value={password}
            onChange= {(e)=> setPassword(e.target.value)}

            />
            <Typography><Link to="/forgot/password">forgot password ?</Link></Typography>

            <Button type="submit" style={{"fontSize":"1.5vmax"}}>Login</Button>
            <Link to="/register">
            <Typography>new user ?</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login