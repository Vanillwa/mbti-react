import React from "react";
import styles from "../css/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";
import SettingDropdown from "./SettingDropdown";


import logo from "../images/logo.avif";
import img from "../images/MBTI.png";
import notImg from "../svg/person-circle.svg";
import home from '../svg/house.svg'
import list from '../svg/card-list.svg'
import freind from '../svg/people-fill.svg'
import profile from '../svg/person-square.svg'
import chatting from '../svg/chat-dots.svg'
const Navbar = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  return (

    
    <div className={styles.container}>
      {/* 상단 네브바 */}
      <nav className={`${styles.item} ${styles.nav}`}>
        <Link to="/post/list" className={styles.navbarLogo}>
          <img src={logo} className={styles.logo}></img>
        </Link>
        <div className={styles.navbarSearch}>
          <input type="text" placeholder="검색" />
        </div>
        <div className={styles.navbarUser}>
          <Link to={isLoggedIn ? "/mypage" : "/"}>
            <span className={styles.userName}>
              {isLoggedIn ? userInfo.nickname : "로그인 해주세요"}
            </span>
            {isLoggedIn ? (
              <img src={img} alt="회원사진" className="user-image" />
            ) : (
              <img src={notImg} alt="회원사진" className="user-image" />
            )}
          </Link>
        </div>
      </nav>


      {/*왼쪽 사이드바*/}
      <div className={`${styles.item} ${styles.leftSidebar}`}>
        <div className={styles.menuItems}>
      <Link className={styles.menu} to="/post/list"><img src={home}/><span>홈</span></Link>
      <Link className={styles.menu} to='/post/write'><span>글쓰기</span></Link>
        <Link className={styles.menu} to="/post/list"><img src={list} />전체 게시판</Link>
        <div className={styles.menu}><EListDropdown/></div>
        <div className={styles.menu}><IListDropdown/></div>
        <Link className={styles.menu} to={isLoggedIn ? '/freind' : '/'}><img src={freind}/>친구</Link>
        <Link className={styles.menu} to={isLoggedIn ? '/message' : '/'}><img src={chatting}/>채팅</Link>
        <Link className={styles.menu} to={isLoggedIn ? '/profile' : '/'}><img src={profile} />마이페이지</Link>
        </div>
        
        <div className={`${styles.menu} ${styles.setting}`}><SettingDropdown/></div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={`${styles.item} ${styles.content}`}><Outlet/></div>

      {/* 오른쪽 사이드 바 */}
      <div className={`${styles.item} ${styles.rightSidebar}`}>rightside</div>
      
    </div>
    
  );
};

export default Navbar;
