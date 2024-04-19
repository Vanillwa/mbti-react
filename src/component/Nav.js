import React from "react";
import "../css/Nav.css";
import styles from '../css/Nav.module.css'
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import logo from '../images/logo.avif'
import { Outlet } from "react-router";
import {useAuthContext} from '../context/AuthContext'
import notImg from '../svg/person-circle.svg'

const Nav = () => {
  const {memoUserInfo} = useAuthContext();
  const {isLoggedIn, userInfo} = memoUserInfo;

  return (
    <>
    <nav className={styles.Container}>
      <Link to="/post/list" className="navbar-logo">
        <img src={logo} className="logo"></img>
      </Link>
      <div className={styles.navbarSearch}>
        <input type="text" placeholder="검색" />
      </div>
      <div className="navbar-user">
        <Link to={(isLoggedIn) ? '/profile' : '/'}>
        <span className="user-name">{(isLoggedIn) ? userInfo.nickname : '로그인 해주세요'}</span>
        {isLoggedIn ? <img src={img} alt="회원사진" className="user-image" /> :
          <img src={notImg} alt="회원사진" className="user-image" />
        }
        
        </Link>
      </div>
    </nav>
    <Outlet/>
    </>
  );
};

export default Nav;
