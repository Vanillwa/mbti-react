import React, { useRef, useState } from "react";
import styles from "../css/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";
import SettingDropdown from "./SettingDropdown";


import logo from "../images/logo.avif";
import notImg from "../svg/person-circle.svg";
import home from '../svg/house.svg'
import list from '../svg/card-list.svg'
import freind from '../svg/people-fill.svg'
import profile from '../svg/person-square.svg'
import chatting from '../svg/chat-dots.svg'

const Navbar = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const dialogRef = useRef();
  const handleopenModal = ()=>{
    dialogRef.current.showModal();
  }
  const handleCloseModal = ()=>{
    dialogRef.current.close();
  }
  if(userInfo.profileImg === null){
    userInfo.profileImg = notImg
  }


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
              (userInfo.profileImg == null ? <img className={styles.userImg} src={notImg}></img> :
              <img src={userInfo.profileImg} className={styles.userImg}/>
              )
            ) : (
              <img src={notImg} alt="회원사진" className={styles.userImg} />
            )}
          </Link>
        </div>
      </nav>


      {/*왼쪽 사이드바*/}
      <div className={`${styles.item} ${styles.leftSidebar}`}>
        <div className={styles.menuItems}>
      <Link className={styles.menu} to="/post/list"><img src={home}/><span>홈</span></Link>
      <Link className={styles.menu} to='/post/write'><span>글쓰기</span></Link>
        <Link className={styles.menu} to="/post/list"><img src={list} /><span>모두의공간</span></Link>
        <div className={styles.menu}><EListDropdown/></div>
        <div className={styles.menu}><IListDropdown/></div>
        {isLoggedIn ? <Link className={styles.menu} to='/freind'><img src={freind}/>친구</Link> :
        <div >
          <div type="button" className={styles.menu} onClick={handleopenModal}>친구</div>
          <dialog className={styles.dialog} ref={dialogRef}>
          <h2>로그인이 필요한 컨텐츠입니다.</h2>
          <p>로그인 하시겠습니까?</p>
          <Link to='/'>로그인 하러가기</Link>
          <br/>
          <div type='button' onClick={handleCloseModal}>닫기</div>
          </dialog>
        </div>
        }
        
        <Link className={styles.menu} to={isLoggedIn ? '/message' : '/'}><img src={chatting}/>채팅</Link>
        <Link className={styles.menu} to={isLoggedIn ? '/profile' : '/'}><img src={profile} />마이페이지</Link>
        </div>
        
        <div type='button' className={`${styles.menu} ${styles.setting}`}><SettingDropdown/></div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={`${styles.item} ${styles.content}`}><Outlet/></div>

      {/* 오른쪽 사이드 바 */}
      <div className={`${styles.item} ${styles.rightSidebar}`}>

      </div>
      
    </div>
    
  );
};

export default Navbar;
