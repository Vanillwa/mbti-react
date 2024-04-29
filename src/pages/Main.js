import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainImageSlider from "../component/MainImageSlider";

import styles from "../css/Main.module.css";

import logo from "../images/areyout.png";

import { fetchLogin } from "../service/api";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function Main() {
  const navigate = useNavigate();
  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const { login } = useAuthContext();
  const [emailAlert, setEmailAlert] = useState();
  const [pwdAlert, setPwdAlert] = useState();
  const location = useLocation();

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
    console.log(body);
    const res = await fetchLogin(body);

    if (
      (res.message === "success" && location.state === "updatePwd") ||
      location.state === "join" ||
      location.state === "findPwd" ||
      location.state === null
    ) {
      login(res.userInfo);
      navigate("/post/list");
    } else if (res.message === "NoExist") {
      setEmailAlert("이메일을 다시 확인해주세요.");
      setPwdAlert("");
    } else if (res.message === "PwdFail") {
      setPwdAlert("비밀번호가 올바르지않습니다.");
      setEmailAlert("");
    } else if (res.message === "success") {
      login(res.userInfo);
      navigate(-1);
    }
  };

  const noLogin = () => {
    navigate("/post/list");
  };
  return (
    <div className={styles.body}>
      <div className={styles.logo}>
        <Link to="/" className={styles.link}>
          <img src={logo}></img>
        </Link>
      </div>

      <Container className={styles.mainCon}>
        <Row>
          <Col md={7}>
            <p className={styles.slideAlert}>
              아래 클릭 시 해당 Mbti 게시판으로 이동합니다.
            </p>
            <MainImageSlider />
          </Col>

          <Col md={5}>
            <Form
              className={`Login-form ${styles.loginform}`}
              onSubmit={handleSubmit}>
              <h1 className={styles.loginlogo}>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <p className={styles.alert}>{emailAlert}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
                <Form.Text className={`text-muted ${styles.linktag}`}>
                  <Link to="/findpwd" className={styles.link}>
                    비밀번호찾기
                  </Link>
                  <Link to="/join"  className={styles.link}>
                    회원가입
                  </Link>
                  <div className={styles.capsLocktag}>
              <span
                    className={
                      capsLockFlag
                        ? `${styles.capsLockOn} capsLockOn`
                        : `${styles.capsLock} capsLock`
                    }>
                    {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
                  </span>
                  </div>
                </Form.Text>
                
              </Form.Group>
            
              <div className={styles.loginbtn}>
                <Button  variant="primary" type="submit">
                  로그인
                </Button>
              </div>
            </Form>
          </Col>
          <div className={`text-center ${styles.noLoginBtn} `}>
            <Button onClick={noLogin}>게시판이동</Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
