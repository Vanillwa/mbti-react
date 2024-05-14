import React, { useState, useEffect, useRef } from 'react';
import styles from "../css/profileDropDown.module.css";
import SettingDropdown from './SettingDropdown';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";
import TouchDetected from './TouchDetected';


const ProfileDropDown = () => {
  //  userinfo에서 아이디값 불러옴
  const [showDropdown, setShowDropdown] = useState(true);
  const dropdownRef = useRef(null); 

  const { memoUserInfo } = useAuthContext();
  const { userInfo } = memoUserInfo;

  TouchDetected(dropdownRef, () => setShowDropdown(false));


  console.log(userInfo)
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {showDropdown && (
        <div className={styles.menu} aria-labelledby="dropdownMenuButton">
          <div className={styles.box3}> <Link to={`/user/${userInfo.userId}`}>내 게시글 보기</Link> </div>
      
          <div className={styles.box1}><Link to="/memberevise" 
          className="dropdown-item">회원정보 수정</Link></div>
          <div className={styles.box2}><SettingDropdown></SettingDropdown></div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;