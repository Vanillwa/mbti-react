import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/listDropdown.css";


function EListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);


  return (
    <div className="list-menu">
      <div className="dropbtn link" onClick={toggleDropdown}>
        나는 E야!
      </div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <Link to="/post/list?mbti=ESTJ">ESTJ</Link>
        <Link to="/post/list?mbti=ESTP">ESTP</Link>
        <Link to="/post/list?mbti=ESFJ">ESFJ</Link>
        <Link to="/post/list?mbti=ESFP">ESFP</Link>
        <Link to="/post/list?mbti=ENTJ">ENTJ</Link>
        <Link to="/post/list?mbti=ENTP">ENTP</Link>
        <Link to="/post/list?mbti=ENFJ">ENFJ</Link>
        <Link to="/post/list?mbti=ENFP">ENFP</Link>
      </div>
    </div>
  );
}

export default EListDropdown;
