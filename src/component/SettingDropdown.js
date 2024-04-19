import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/SettingDropdown.module.css'

const SettingDropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = ()=>setDropdown(false)

  return (
    <div className={styles.menu}>
      <div onClick={toggleDropdown}>설정</div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <Link to='/logout' onClick={closeDropdown}>로그아웃</Link>
        <div onClick={closeDropdown} type='button'>다크모드</div>
      </div>
    </div>
  );
};

export default SettingDropdown;