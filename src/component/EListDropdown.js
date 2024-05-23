import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../css/listDropdown.module.css'
import mbtiE from '../images/mbtiE.png'
function EListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)


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
      <div  className={`${styles.dropBtn} ${styles.link}`} onClick={toggleDropdown}>
      <img className={styles.svg} src={mbtiE} /><div className={styles.span}>나는 E야!</div>
      </div>
      <div className={`${styles.dropdownContent} ${dropdown ? styles.show : ""}`}>
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
