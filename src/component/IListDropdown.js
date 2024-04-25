import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../css/listDropdown.module.css'
import mbtiI from '../images/mbtiI.png'
import { useLocation } from "react-router-dom";
function IListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)
const location = useLocation();
const state = location.state;
  const dropdownRef = useRef();

  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.addEventListener('mousedown', handleClickOutside);

    }
  }, [dropdownRef])
  return (
    <div className={styles.listMenu} ref={dropdownRef}>
      <div className={`${styles.dropBtn} ${styles.link}`} onClick={toggleDropdown}>
      <img className={styles.imgI} src={mbtiI}/><span className={styles.span}>나는 I야!</span>
      </div>
      <div className={`${styles.dropdownContent} ${dropdown ? styles.show : ""}`}>
        
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
