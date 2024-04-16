import React from "react";
import '../css/Nav.css'
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="navbar">
      <Link to='/' className="navbar-logo">로고</Link>
      <div className="navbar-search">
        <input type="text" placeholder="검색" />
      </div>
      <div className="navbar-user">
        <Link to='/chatroom'>채팅</Link>
        <span className="user-name">회원이름</span> {/* 회원 이름 */}
        <img src="user_image_url" alt="회원사진" className="user-image" />{" "}
        {/* 회원사진 URL */}
      </div>
    </nav>
  );
};

export default Nav;
