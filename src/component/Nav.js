import React from "react";
import "../css/Nav.css";
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import logo from '../images/logo.avif'
import chatIcon from '../svg/chat-dots.svg'
const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} className="logo"></img>
      </Link>
      <div className="navbar-search">
        <input type="text" placeholder="검색" />
      </div>
      <div className="navbar-user">
        <Link to="/chatroom" className="chatLink"><img src={chatIcon} className="chatIcon"></img></Link>
        <Link to='/'>
        <span className="user-name">유저이름</span>
        <img src={img} alt="회원사진" className="user-image" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
