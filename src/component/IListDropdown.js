import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/listDropdown.css";


function IListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)
  return (
    <div className="list-menu">
      <div className="dropbtn link" onClick={toggleDropdown}>
        나는 I야!
      </div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        
        <Link to="/post/list?mbti=ISTJ" onClick={closeDropdown}>ISTJ</Link>
        <Link to="/post/list?mbti=ISTP" onClick={closeDropdown}>ISTP</Link>
        <Link to="/post/list?mbti=ISFJ" onClick={closeDropdown}>ISFJ</Link>
        <Link to="/post/list?mbti=ISFP" onClick={closeDropdown}>ISFP</Link>
        <Link to="/post/list?mbti=INTJ" onClick={closeDropdown}>INTJ</Link>
        <Link to="/post/list?mbti=INTP" onClick={closeDropdown}>INTP</Link>
        <Link to="/post/list?mbti=INFJ" onClick={closeDropdown}>INFJ</Link>
        <Link to="/post/list?mbti=INFP" onClick={closeDropdown}>INFP</Link>
      </div>
    </div>
  );
}

export default IListDropdown;
