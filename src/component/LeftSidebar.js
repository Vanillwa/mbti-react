import React from "react";
import "../css/leftSidebar.css";
import { Link } from "react-router-dom";
import ListDropdown from "./ListDropdown";

// 아직 모양만 구현한 상태
const LeftSidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/list">홈</Link>
        <Link><ListDropdown/></Link>
        <Link to="/friends">친구</Link>
        <Link to="/chatlist">메세지</Link>
        <Link to="/profile">프로필</Link>
        <Link to="/setting">설정</Link>
      </div>
    </>
  );
};

export default LeftSidebar;

// 사이드바 위에부터 홈/게시판 전체, mbti별/친구/메세지/프로필/설정
