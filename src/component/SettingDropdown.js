import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/SettingDropdown.module.css'
import { fetchLogout } from '../service/api';

const SettingDropdown = () => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);

  const closeDropdown = async()=>{
    
    setDropdown(false)
  }

  const clickLogout= async()=>{
    const result =  await fetchLogout();
    
    if(result.message === "success"){
      alert("로그아웃 완료!")
      navigate("/")
    }
    
  }

  return (
    <div className={styles.menu}>
      <div onClick={toggleDropdown}>설정</div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <div type="button" onClick={clickLogout}>로그아웃</div>
        <div onClick={closeDropdown} type='button'>다크모드</div>
      </div>
    </div>
  );
};

export default SettingDropdown;