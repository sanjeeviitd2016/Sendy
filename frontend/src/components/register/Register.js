import { Avatar, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../actions/userAction";
import "./Register.css";
import Loader from "../Loader/Loader";
import logo from "../../images/logo.jpg"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate= useNavigate();

  const { error,success, loading } = useSelector(state=>state.user)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, avatar));
  };

  useEffect(() => {

    if (success) {
      navigate("/");
      alert.success("registered successfully!");
      
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
  }, [dispatch, error, alert,success,navigate]);

  return loading ? (
    <Loader />
  ) : (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        {/* <Typography> Postbook</Typography> */}
        <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />
        
        <Avatar
          src={avatar}
          alt="avatar"
          sx={{ height: "6vmax", width: "6vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>
        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
