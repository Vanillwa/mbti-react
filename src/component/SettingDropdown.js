import React, { useContext,} from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import styles from '../css/SettingDropdown.module.css'
import { fetchLogout } from "../service/api/loginAPI";
import { AuthContext, useAuthContext } from '../context/AuthContext';

const SettingDropdown = () => {
  const { memoUserInfo, socket } = useAuthContext();
  const { isLoggedIn } = memoUserInfo;
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);
  
  const clickLogout = async () => {
    logout();
    const result = await fetchLogout();
    console.log(result.message)
    if (result.message === 'success') {
      navigate("/", { state: "logout" })
    }
  }

  return (
    <div className={styles.menu}>
     
        {isLoggedIn ? <div type="button" onClick={clickLogout}>로그아웃</div> : <div />}
       
      </div>
   
  );
};

export default SettingDropdown;