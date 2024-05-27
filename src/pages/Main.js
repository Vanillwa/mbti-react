import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainImageSlider from "../component/MainImageSlider";

import styles from "../css/Main.module.css";

import logo from "../images/areyout.png";

import { fetchLogin, fetchLogout } from "../service/api/loginAPI";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "../context/AuthContext";
import Footer from "../component/Footer";

function Main() {
  const navigate = useNavigate();
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const { login } = useAuthContext();
  const [emailAlert, setEmailAlert] = useState();
  const [pwdAlert, setPwdAlert] = useState();
  const location = useLocation();
  const { memoUserInfo, logout, socket } = useAuthContext();
  const { isLoggedIn, userInfo,  } = memoUserInfo;

  const [emailValidColor, setEmailValidColor] = useState("");
  const [passwordValidColor, setPasswordValidColor] = useState("");

  //로그인 기능
  const handleSubmit = async e => {
    e.preventDefault();
    let body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetchLogin(body);

    let array = ["updatePwd", "join", "findPwd", "logout", null];

    if (res.message === "success") {
      login(res.userInfo);
      socket.emit('login')
      if (array.includes(location.state)) navigate("/post/list");
      else navigate(-1);
    } else if (res.message === "blocked") {
      setEmailAlert(
        `${new Date(res.blockDate).toLocaleString()} 까지 차단된 계정입니다`
      );
    } else if (res.message === "NoExist") {
      setEmailAlert("이메일을 다시 확인해주세요.");
      setEmailValidColor("is-invalid");
      setPwdAlert("");
      return;
    } else if (res.message === "PwdFail") {
      setPwdAlert("비밀번호가 올바르지않습니다.");
      setEmailAlert("");
      setPasswordValidColor("is-invalid");
      return;
    }
  };

  const noLogin = () => {
    navigate("/post/list");
  };
  const goLogout = async () => {
    logout();
    const result = await fetchLogout();
    if (result.message === "success") {
      navigate("/", { state: "logout" });
    }
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

              <div className={styles.imageBox}>
                <img
                  className={styles.profileImage}
                  src={userInfo.profileImage}
                  alt="유저 프로필사진"
                />{" "}
              </div>

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
                      className={`form-control ${
                        emailAlert === "이메일을 다시 확인해주세요."
                          ? emailValidColor
                          : emailValidColor
                      } `}
                      required
                    />
                    <p className={styles.alert}>{emailAlert}</p>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      className={`form-control ${
                        pwdAlert === "비밀번호가 올바르지않습니다."
                          ? passwordValidColor
                          : passwordValidColor
                      } `}
                      name="password"
                      type="password"
                      placeholder="Password"
                      pattern=".{6,20}"
                      title="6~20 글자 사이의 비밀번호를 입력해주세요"
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
        {isLoggedIn ? (
          <Button className={styles.logoutBtn} onClick={goLogout}>
            로그아웃
          </Button>
        ) : null}
      </div>
      
      {/* 푸터로 변경 */}
      <Footer></Footer>
    </div>
  );
}

export default Main;
