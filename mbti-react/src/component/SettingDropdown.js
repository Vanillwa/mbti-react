import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/SettingDropdown.module.css'
import { fetchLogout } from '../service/api';
import { AuthContext, AuthProvider } from '../context/AuthContext';
const SettingDropdown = () => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
const {logout} = useContext(AuthContext);
  const closeDropdown = async()=>{
    
    setDropdown(false)
  }

  const clickLogout= async()=>{
    const result =  await fetchLogout();
    console.log(result.message)
    if(result.message === 'success'){
      alert('로그아웃 완료')
     logout();
    }

  }

  return (
    <div  className={styles.menu}>
      <div  type='button' onClick={toggleDropdown}><span>설정</span></div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        <div type="button" onClick={clickLogout}>로그아웃</div>
        <div onClick={closeDropdown} type='button'>다크모드</div>
      </div>
    </div>
  );
};

export default SettingDropdown;