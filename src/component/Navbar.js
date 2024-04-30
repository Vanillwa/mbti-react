import React, { useRef, useState } from "react";
import styles from "../css/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";
import SettingDropdown from "./SettingDropdown";

import RUT from "../images/areyout.png";
import write from "../svg/pencil-square.svg";
import notImg from "../svg/person-circle.svg";
import home from "../svg/house.svg";
import list from "../svg/card-list.svg";
import friend from "../svg/people-fill.svg";
import profile from "../svg/person-square.svg";
import chatting from "../svg/chat-dots.svg";
import { PiSirenFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const location = useLocation();
  const navigate = useNavigate();
  const dialogRef = useRef();
  const handleopenModal = () => {
    dialogRef.current.showModal();
  };
  const handleCloseModal = () => {
    dialogRef.current.close();
  };

  const [dropdown, setDropdown] = useState(false);
  const closeDropdown = () => {
    setDropdown(false);
  };
  const compareLogin = () => {
    isLoggedIn
      ? navigate("/memberevise", { state: { state: "mypage" } })
      : navigate("/", { state: { state: "login" } });
  };

  return (
    <div className={styles.container}>
      {/* 상단 네브바 */}
      <nav className={`${styles.item} ${styles.nav}`}>
        <Link to="/post/list" className={styles.navbarLogo}>
          <img src={RUT} className={styles.logo}></img>
        </Link>
        <div className={styles.navbarSearch}>
          <input type="text" placeholder="검색" />
        </div>
        <div className={styles.navbarUser}>
          <button
            className={styles.profileBtn}
            type="button"
            onClick={compareLogin}
          >
            <span className={styles.userName}>
              {isLoggedIn ? userInfo.nickname : "로그인 해주세요"}
            </span>
            {isLoggedIn ? (
              <img src={userInfo.profileImage} className={styles.userImg} />
            ) : (
              <img src={notImg} alt="회원사진" className={styles.userImg} />
            )}
          </button>
        </div>
      </nav>

      {/*왼쪽 사이드바*/}
      <div className={`${styles.item} ${styles.leftSidebar}`}>
        <div className={styles.menuItems}>
          <Link className={styles.menu} to="/post/list">
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
                onClick={handleopenModal}
              >
                <img className={styles.svg} src={write} />
                <div className={styles.span}>글쓰기</div>
              </div>
              <dialog className={styles.dialog} ref={dialogRef}>
                <h2>로그인이 필요한 컨텐츠입니다.</h2>
                <p>로그인 하시겠습니까?</p>
                <Link to={`/`}>로그인 하러가기</Link>
                <br />
                <div type="button" onClick={handleCloseModal}>
                  닫기
                </div>
              </dialog>
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
                onClick={handleopenModal}
              >
                <img className={styles.svg} src={friend} />
                <div className={styles.span}>친구</div>
              </div>
              <dialog className={styles.dialog} ref={dialogRef}>
                <h2>로그인이 필요한 컨텐츠입니다.</h2>
                <p>로그인 하시겠습니까?</p>
                <Link to={`/`}>로그인 하러가기</Link>
                <br />
                <div type="button" onClick={handleCloseModal}>
                  닫기
                </div>
              </dialog>
            </div>
          )}
          {isLoggedIn ? (
            <Link className={styles.menu} to="/message">
              <img className={styles.svg} src={chatting} />
              <div className={styles.span}>채팅</div>
            </Link>
          ) : (
            <div>
              <div
                type="button"
                className={styles.menu}
                onClick={handleopenModal}
              >
                <img className={styles.svg} src={chatting} />
                <div className={styles.span}>채팅</div>
              </div>
              <dialog className={styles.dialog} ref={dialogRef}>
                <h2>로그인이 필요한 컨텐츠입니다.</h2>
                <p>로그인 하시겠습니까?</p>
                <Link to={`/`}>로그인 하러가기</Link>
                <br />
                <div type="button" onClick={handleCloseModal}>
                  닫기
                </div>
              </dialog>
            </div>
          )}
          {isLoggedIn ? (
            <Link
              className={styles.menu}
              to={isLoggedIn ? "/memberevise" : "/"}
            >
              <img className={styles.svg} src={profile} />
              <div className={styles.span}> 마이페이지</div>
            </Link>
          ) : (
            <div>
              <div
                type="button"
                className={styles.menu}
                onClick={handleopenModal}
              >
                <img className={styles.svg} src={profile} />
                <div className={styles.span}>마이페이지</div>
              </div>
              <dialog className={styles.dialog} ref={dialogRef}>
                <h2 className="pt-2 pb-2">로그인이 필요한 컨텐츠입니다.</h2>
                <p>로그인 하시겠습니까?</p>
                <div className="d-flex justify-content-end">
                  <Link className={styles.goLogin} to={`/`}>로그인 하러가기</Link>
                  <div type="button" onClick={handleCloseModal}>
                    닫기
                  </div>
                </div>
              </dialog>
            </div>
            
          )}
          {userInfo.role ==="admin" ? 
          <Link className={styles.menu} to={"/reportlist"}><PiSirenFill/>신고목록</Link>
          :  "" }
        </div>

        <div type="button" className={`${styles.menu} ${styles.setting}`}>
          <SettingDropdown />
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
