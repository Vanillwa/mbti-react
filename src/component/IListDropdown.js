import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/listDropdown.css";


function IListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);


  return (
    <div className="list-menu">
      <div className="dropbtn link" onClick={toggleDropdown}>
        나는 I야!
      </div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        
        <Link to="/post/list?mbti=ISTJ">ISTJ</Link>
        <Link to="/post/list?mbti=ISTP">ISTP</Link>
        <Link to="/post/list?mbti=ISFJ">ISFJ</Link>
        <Link to="/post/list?mbti=ISFP">ISFP</Link>
        <Link to="/post/list?mbti=INTJ">INTJ</Link>
        <Link to="/post/list?mbti=INTP">INTP</Link>
        <Link to="/post/list?mbti=INFJ">INFJ</Link>
        <Link to="/post/list?mbti=INFP">INFP</Link>
      </div>
    </div>
  );
}

export default IListDropdown;
