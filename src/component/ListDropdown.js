import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/listDropdown.css";

function ListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  return (
    <div className="list-menu">
      <Link className="dropbtn" onClick={toggleDropdown}>
        게시판
      </Link>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <Link to="/list">전체 게시판</Link>
        <Link to="/list/ISTJ">ISTJ</Link>
        <Link to="/list/ISTP">ISTP</Link>
        <Link to="/list/ISFJ">ISFJ</Link>
        <Link to="/list/ISFP">ISFP</Link>
        <Link to="/list/INTJ">INTJ</Link>
        <Link to="/list/INTP">INTP</Link>
        <Link to="/list/INFJ">INFJ</Link>
        <Link to="/list/INFP">INFP</Link>
        <Link to="/list/ESTJ">ESTJ</Link>
        <Link to="/list/ESTP">ESTP</Link>
        <Link to="/list/ESFJ">ESFJ</Link>
        <Link to="/list/ESFP">ESFP</Link>
        <Link to="/list/ENTJ">ENTJ</Link>
        <Link to="/list/ENTP">ENTP</Link>
        <Link to="/list/ENFJ">ENFJ</Link>
        <Link to="/list/ENFP">ENFP</Link>
      </div>
    </div>
  );
}

export default ListDropdown;
