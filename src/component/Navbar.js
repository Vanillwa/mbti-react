import React, { useEffect, useState } from "react";
import styles from "../css/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import search from "../svg/search.svg";
import User from "../svg/people-fill.svg";
import RUT from "../images/areyout.png";
import write from "../svg/pencil-square.svg";
import notImg from "../svg/person-circle.svg";
import list from "../svg/card-list.svg";
import friend from "../svg/people-fill.svg";
import chatting from "../svg/chat-dots.svg";
import { PiSirenFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import sweetalert from "./sweetalert";
import Alarm from "./Alarm";
import home from "../svg/house.svg";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import { fetchLogout } from "../service/api/loginAPI";

const Navbar = ({ chatData, chatStatus }) => {
  const { memoUserInfo, logout } = useAuthContext();

  const { isLoggedIn, userInfo } = memoUserInfo;

  const [showChat, setShowChat] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleopenModal = async () => {
    const result = await sweetalert.question(
      "로그인이 필요한 컨텐츠입니다.",
      "로그인 하시겠습니까?",
      "로그인 하러가기",
      "닫기"
    );
    if (result.dismiss) return;
    else {
      navigate("/");
    }
  };

  const compareLogin = () => {
    if (isLoggedIn) {
    } else {
      navigate("/", { state: { state: "login" } });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let keyword = e.target.keyword.value;

    if (keyword == "") return;

    navigate("/search", { state: { keyword } });
  };
  useEffect(() => {
    if (chatData != null) {
      if (isLoggedIn) {
        const allMessagesRead = chatData.every(
          (item) => item.unreadCount === 0
        );
        setShowChat(!allMessagesRead);
      }
    }
  }, [chatData]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const clickLogout = async () => {
    logout();
    const result = await fetchLogout()
    console.log(result.message)
    if (result.message === 'success') {
      navigate("/", { state: "logout" })
    }
  }

  if (chatStatus === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (chatStatus === "error") {
    return <h1>에러</h1>;
  }

  return (
    <div className={styles.container}>
      {/* 768px 상단 내브 */}
      <div className={styles.nav}>
        <Link to="/" className={styles.logoBox}>
          <img className={styles.topLogo} src={RUT} />
        </Link>
        <div className={styles.navbarSearch}>
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="검색" name="keyword" />
          </form>
        </div>
      </div>
      {/*왼쪽 사이드바*/}

      <div className={`${styles.item} ${styles.leftSidebar}`}>
        <div className={styles.menuItems}>
          <div className={styles.rutMenu}>
            <Link to="/" className={`${styles.menu}`}>
              <img src={RUT} className={`${styles.logo}`} />
            </Link>
          </div>
          <div className={styles.homeMenu}>
            <Link to="/" className={`${styles.menu}`}>
              <img src={home} className={styles.svg} />
            </Link>
          </div>
          {/* <div className={styles.navbarSearch}>
          <form onSubmit={handleSearch}>
          <input type="text" placeholder="검색" name="keyword"  />
          </form>
        </div> */}
          <Button
            className={`${styles.menu} ${styles.hiddenSearch}`}
            variant=""
            onClick={handleShow}
            style={{ padding: 0 }}
          >
            <img src={search} className={styles.svg} />
            <span className={styles.span}>검색</span>
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>검색하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  handleSearch(e);
                  handleClose();
                }}
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="keyword"
                    type="text"
                    placeholder="검색"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Link className={styles.menu} to="/post/list">
            <img className={styles.svg} src={list} />
            <div className={styles.span}>게시판</div>
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
            </div>
          )}

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
            </div>
          )}
          {isLoggedIn ? (
            // 채팅창 이동
            <Link className={styles.menu} to="/chat">
              <img className={styles.svg} src={chatting} />
              <div className={styles.span}>채팅</div>
              {showChat == true ? (
                <div className={styles.showChat}>❕</div>
              ) : null}
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
            </div>
          )}

          {userInfo != null && userInfo.role === "admin" ? (
            <>
              <Link className={styles.menu} to={"/reportlist"}>
                <PiSirenFill className={styles.svg} />
                <div className={styles.span}>신고목록</div>
              </Link>
              <Link className={styles.menu} to={"/user"}>
                <img className={styles.svg} src={User} />
                <div className={styles.span}>회원목록</div>
              </Link>
            </>
          ) : (
            ""
          )}
          <div onClick={compareLogin} className={styles.menu}>
            {isLoggedIn ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    <div className="d-flex">
                      <div className={styles.imgBox}>
                        <img
                          src={userInfo.profileImage}
                          className={`${styles.userImg} ${styles.svg}`}
                        />
                      </div>
                      <div className={styles.nickname}>{userInfo.nickname}</div>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        navigate(`/user/${userInfo.userId}`);
                      }}
                    >
                      프로필 보기
                    </Dropdown.Item>
                    <>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => navigate("/memberevise")}
                      >
                        회원 정보 수정
                      </Dropdown.Item>
                      <Dropdown.Item onClick={clickLogout}>
                        로그아웃
                      </Dropdown.Item>
                    </>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div>
                <img src={notImg} alt="회원사진" className={styles.svg} />
                <div className={styles.span}>로그인 해주세요.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={`${styles.item} ${styles.content}`}>
        <Outlet />
        <Alarm />
      </div>
    </div>
  );
};

export default Navbar;
