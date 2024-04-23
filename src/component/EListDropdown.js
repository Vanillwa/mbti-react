import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../css/listDropdown.module.css'
import mbtiE from '../images/mbtiE.png'
function EListDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)

  return (
    <div className={styles.listMenu}>
      <div className={`${styles.dropBtn} ${styles.link}`} onClick={toggleDropdown}>
      <img className={styles.imgE} src={mbtiE} /><span className={styles.span}>나는 E야!</span>
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
