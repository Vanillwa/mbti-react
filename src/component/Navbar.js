import React, { useRef, useState } from "react";
import styles from "../css/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";

import User from "../svg/people-fill.svg"
import RUT from "../images/areyout.png";
import write from "../svg/pencil-square.svg";
import notImg from "../svg/person-circle.svg";
import home from "../svg/house.svg";
import list from "../svg/card-list.svg";
import friend from "../svg/people-fill.svg";
import chatting from "../svg/chat-dots.svg";
import { PiSirenFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../component/ProfileDropDown";
import sweetalert from "./sweetalert";

const Navbar = () => {
  const { memoUserInfo } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, userInfo } = memoUserInfo;

  const navigate = useNavigate();
  const dialogRef = useRef();

  const handleopenModal = async() => {
    const result = await sweetalert.question('로그인이 필요한 컨텐츠입니다.', '로그인 하시겠습니까?','로그인 하러가기','닫기')
    if(result.dismiss) return;
    else{
      navigate('/')
    }
  };

  const handleRequestLogin = ()=>{
    navigate("/",{state:"login"})
  }
  
  const compareLogin = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/", { state: { state: "login" } }); 
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 네브바 */}
      <nav className={`${styles.item} ${styles.nav}`}>
        <div className={styles.navbarLogo}>
          <img src={RUT} className={styles.logo}></img>
        </div>
        <div className={styles.navbarSearch}>
          <input type="text" placeholder="검색" />
        </div>
        <div className={styles.navbarUser}>
          <button
            className={styles.profileBtn}
            type="button"
            onClick={compareLogin}>
            <span className={styles.userName}>
              {isLoggedIn ? `${userInfo.nickname} 님`  : "로그인 해주세요"}
            </span>
            {isLoggedIn ? (
              <img src={userInfo.profileImage} className={styles.userImg} />
            ) : (
              <img src={notImg} alt="회원사진" className={styles.userImg}  />
            )}
          </button>
          {showDropdown && <ProfileDropDown/>}
        </div>
      </nav>


      {/*왼쪽 사이드바*/}
      <div className={`${styles.item} ${styles.leftSidebar}`}>
        <div className={styles.menuItems}>
          <Link className={styles.menu} to="/">
            <img className={styles.svg} src={home} />
            <div className={styles.span}>홈</div>
          </Link>
          {isLoggedIn ? (
            <Link className={styles.menu} to="/post/write">
              <img className={styles.svg} src={write} />
              <div className={styles.span}>글쓰기</div>
            </Link>
          ) : (
            <div>
              <div
                type="button"
                className={styles.menu}
                onClick={handleopenModal}>
                <img className={styles.svg} src={write} />
                <div className={styles.span}>글쓰기</div>
              </div>
            </div>
          )}

          <Link className={styles.menu} to="/post/list">
            <img className={styles.svg} src={list} />
            <div className={styles.span}>모두의공간</div>
          </Link>
          <div className={`${styles.menu} ${styles.mbtiMenu}`}>
            <EListDropdown />
          </div>
          <div className={`${styles.menu} ${styles.mbtiMenu}`}>
            <IListDropdown />
          </div>
          {isLoggedIn ? (
            <Link className={styles.menu} to="/friend">
              <img className={styles.svg} src={friend} />
              <div className={styles.span}>친구</div>
            </Link>
          ) : (
            <div>
              <div
                type="button"
                className={styles.menu}
                onClick={handleopenModal}>
                <img className={styles.svg} src={friend} />
                <div className={styles.span}>친구</div>
              </div>
              
            </div>
          )}
          {isLoggedIn ? (
            // 채팅창 이동
            <Link className={styles.menu} to="/chat/list">
              <img className={styles.svg} src={chatting}/>
              <div className={styles.span}>채팅</div>
            </Link>
          ) : (
            <div>
              <div
                type="button"
                className={styles.menu}
                onClick={handleopenModal}>
                <img className={styles.svg} src={chatting} />
                <div className={styles.span} >채팅</div>
              </div>
            </div>
          )}


          {userInfo != null && userInfo.role === "admin" ? (
            <>
              <Link className={styles.menu} to={"/reportlist"}>
              
                <PiSirenFill className={styles.svg} />
                <div className={styles.span}>
                신고목록
                </div>
              </Link>
              <Link className={styles.menu} to={"/user"}>
                <img className={styles.svg} src={User}/>
                <div className={styles.span}>
                회원목록
                </div>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>

        <div type="button" className={`${styles.menu} ${styles.setting}`}>
        
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={`${styles.item} ${styles.content}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
