import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import User from "../User/User";
import { Typography,Button } from "@mui/material";
import "./Search.css"
import { clearErrors, getAllUsers } from "../../actions/userAction";
import Loader from "../Loader/Loader"
import logo from "../../images/logo.jpg"

const Search = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [name, setName] = useState("");
  const { loading, users, error ,success} = useSelector(state=> state.allUsers);

const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(getAllUsers(name))
}

useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors())
    }
},[dispatch,error,alert,success])


  return (
      loading? <Loader/> :(
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        {/* <Typography variant="h3" style={{ padding: "2vmax" }}> Postbook</Typography> */}
        <img src={logo} alt="Sendy" style={{width:"35%"}} />

        <input
          type="text"
          value={name}
          placeholder="Search name or Username"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {users &&
            users.map((user) => (
            
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div> 
    )
  );
};

export default Search;
