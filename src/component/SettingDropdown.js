import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/SettingDropdown.module.css'
import { fetchLogout } from "../service/api/api";
import { AuthContext, useAuthContext } from '../context/AuthContext';
const SettingDropdown = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn } = memoUserInfo;
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
      logout();
      navigate("/",{state:"logout"})
     
    }

  }  

  return (
    <div  className={styles.menu}>
      <div  type='button' onClick={toggleDropdown}><span>설정</span></div>
      <div className={`dropdown-content ${dropdown ? "show" : ""}`}>
        {isLoggedIn ? <div type="button" onClick={clickLogout}>로그아웃</div> : <div/> }
        <div onClick={closeDropdown} type='button'>다크모드</div>
      </div>
    </div>
  );
};

export default SettingDropdown;