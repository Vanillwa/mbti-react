import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainImageSlider from "../component/MainImageSlider";

import styles from "../css/Main.module.css";

import logo from "../images/areyout.png";

import { fetchLogin } from "../service/api/loginAPI"
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";

function Main() {
  console.log("rendered")
  const navigate = useNavigate();
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const { login } = useAuthContext();
  const [emailAlert, setEmailAlert] = useState();
  const [pwdAlert, setPwdAlert] = useState();
  const location = useLocation();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const checkCapsLock = e => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };

  //로그인 기능
  const handleSubmit = async e => {
    e.preventDefault();
    let body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetchLogin(body);
    let array = ["updatePwd", "join", "findPwd", "logout",null]

    if (res.message === "success") {
      socket.emit("login");
      login(res.userInfo);
      if (array.includes(location.state)) navigate("/post/list");
      else navigate(-1);
    } else if (res.message === "blocked") {
      setEmailAlert(`${res.blockDate}까지 차단된 계정입니다`);
    } else if (res.message === "NoExist") {
      setEmailAlert("이메일을 다시 확인해주세요.");
      setPwdAlert("");
      return;
    } else if (res.message === "PwdFail") {
      setPwdAlert("비밀번호가 올바르지않습니다.");
      setEmailAlert("");
      return;
    }
  };

  const noLogin = () => {
    navigate("/post/list");
  };
  return (
    <div className={styles.body}>
      <div className={styles.mainCon}>
        <div className={styles.slide}>
          <p className={styles.slideAlert}>
            아래 클릭 시 해당 Mbti 게시판으로 이동합니다.
          </p>
          <MainImageSlider />
        </div>

        <div>
          {isLoggedIn ? (
            <div className={styles.isLoggedInBox}>
              <div className={styles.nickname}>
                🎉{userInfo.nickname}님 어서오세요 반갑습니다.
              </div>
              <Link to={"/memberevise"}>
                <div className={styles.imageBox}>
                  <img
                    className={styles.profileImage}
                    src={userInfo.profileImage}
                    alt="유저 프로필사진"
                  />{" "}
                </div>
              </Link>
              <p className={styles.goodDay}>😀즐거운 하루 되세요~</p>
            </div>
          ) : (
            <>
              <Form
                className={`Login-form ${styles.loginform}`}
                onSubmit={handleSubmit}>
                <div className={styles.logo}>
                  <Link to="/" className={styles.link}>
                    <img src={logo}></img>
                  </Link>
                </div>
                <div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <p className={styles.alert}>{emailAlert}</p>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      pattern=".{6,20}"
                      title="6~20 글자 사이의 비밀번호를 입력해주세요"
                      onKeyDown={e => checkCapsLock(e)}
                      required
                    />
                    <p className={styles.alert}>{pwdAlert}</p>
                    <div className={styles.loginbtn}>
                      <Button variant="primary" type="submit">
                        로그인
                      </Button>
                      <hr />
                    </div>
                    <div className={styles.findPwd}>
                      <span>비밀번호를 잊으셨나요?</span>
                      <Link to="/findpwd" className={styles.link}>
                        찾기
                      </Link>
                    </div>
                  </Form.Group>
                </div>
              </Form>
              <div className={styles.joinWrapper}>
                <span>계정이 없으신가요?</span>
                <Link to="/join" className={styles.link}>
                  회원가입
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`text-center ${styles.noLoginBtn} `}>
        <Button onClick={noLogin}>게시판이동</Button>
      </div>
      <footer className={styles.footer}>
        <span>소개</span>
        <span>블로그</span>
        <span>도움말</span>
        <span>API</span>
        <span>개인정보처리방침</span>
        <span>약관</span>
        <span>위치</span>
        <span>Are You T Lite</span>
        <span>Threads</span>
        <span>비사용자</span>
        <span>Meta Verified</span>
        <span>한국어</span>
        <span>© 2024 Are You T ?</span>
      </footer>
    </div>
  );
}

export default Main;
