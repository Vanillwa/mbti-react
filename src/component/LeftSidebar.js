import React from "react";
import "../css/leftSidebar.css";
import { Link } from "react-router-dom";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";
import { useAuthContext } from "../context/AuthContext";

// 아직 모양만 구현한 상태
const LeftSidebar = () => {
  const {memoUserInfo} = useAuthContext();
  const {isLoggedIn, userInfo} = memoUserInfo;

  return (
    <>
      <div className="sidebar">
        <Link className='link' to="/post/list">홈</Link>
        <Link className='link' to="/post/list">전체 게시판</Link>
        <div className='link'><EListDropdown/></div>
        <div className='link'><IListDropdown/></div>
        <Link className='link' to={isLoggedIn ? '/freind' : '/'}>{isLoggedIn ? '친구' : '친구(로그인필요)'}</Link>
        <Link className='link' to={isLoggedIn ? '/message' : '/'}>{isLoggedIn ? '메세지' : '메세지(로그인필요)'}</Link>
        <Link className='link' to={isLoggedIn ? '/profile' : '/'}>{isLoggedIn ? '프로필' : '마이페이지(로그인필요)'}</Link>
        <Link className='link' to="/setting">설정</Link>
      </div>
    </>
  );
};

export default LeftSidebar;

// 사이드바 위에부터 홈/게시판 전체, mbti별/친구/메세지/프로필/설정
