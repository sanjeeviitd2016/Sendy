import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import "./Header.css";
import logo from "../../images/logo.jpg";

const Header = () => {
  const [tab, settab] = useState(window.location.pathname);
  console.log("window.location.pathname", window.location.pathname);
  return (
    <div className="header">
      <Link to="/">
        {" "}
        <img
          src={logo}
          alt="Sendy"
          className="appLogo"
        />
      </Link>
      <Link to="/" onClick={() => settab("/")}>
        {tab === "/" ? (
          <Home style={{ color: "black" }}></Home>
        ) : (
          <HomeOutlined />
        )}
      </Link>
      <Link to="/newPost" onClick={() => settab("/newPost")}>
        {tab === "/newPost" ? (
          <Add style={{ color: "black" }}></Add>
        ) : (
          <AddOutlined />
        )}
      </Link>
      <Link to="/search" onClick={() => settab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }}></Search>
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link to="/account" onClick={() => settab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }}></AccountCircle>
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;
