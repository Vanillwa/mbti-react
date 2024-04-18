import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/listDropdown.css";


function EListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)

  return (
    <div className="list-menu">
      <div className="dropbtn link" onClick={toggleDropdown}>
        나는 E야!
      </div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <Link to="/post/list?mbti=ESTJ" onClick={closeDropdown}>ESTJ</Link>
        <Link to="/post/list?mbti=ESTP" onClick={closeDropdown}>ESTP</Link>
        <Link to="/post/list?mbti=ESFJ" onClick={closeDropdown}>ESFJ</Link>
        <Link to="/post/list?mbti=ESFP" onClick={closeDropdown}>ESFP</Link>
        <Link to="/post/list?mbti=ENTJ" onClick={closeDropdown}>ENTJ</Link>
        <Link to="/post/list?mbti=ENTP" onClick={closeDropdown}>ENTP</Link>
        <Link to="/post/list?mbti=ENFJ" onClick={closeDropdown}>ENFJ</Link>
        <Link to="/post/list?mbti=ENFP" onClick={closeDropdown}>ENFP</Link>
      </div>
    </div>
  );
}

export default EListDropdown;
