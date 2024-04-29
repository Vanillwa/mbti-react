import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainImageSlider from "../component/MainImageSlider"

import styles from "../css/Main.module.css";

import logo from "../images/areyout.png";

import { fetchLogin } from "../service/api";
import { useNavigate, useLocation, NavigationType } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function Main() {
  const navigate = useNavigate();

  const { login } = useAuthContext();
  const [emailAlert, setEmailAlert] = useState();
  const [pwdAlert, setPwdAlert] = useState();
  const location = useLocation();

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
            <MainImageSlider/>
          </Col>

          <Col md={5}>
            <Form
              className={`Login-form ${styles.loginform}`}
              onSubmit={handleSubmit}>
              <h1 className={styles.loginlogo}>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control name="email" type="email" placeholder="Email" required/>
                <p className={styles.alert}>{emailAlert}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <p className={styles.alert}>{pwdAlert}</p>
                <Form.Text className="text-muted">
                  <Link to="/findpwd" className={styles.link}>
                    비밀번호찾기
                  </Link>
                  <Link to="/join" className={styles.link}>
                    회원가입
                  </Link>
                </Form.Text>
              </Form.Group>
              <div className={styles.loginbtn}>
                <Button variant="primary" type="submit">
                  로그인
                </Button>
              </div>
            </Form>
          </Col>
          <div className="text-center">
            <Button
              variant="dark"
              onClick={() => (window.location.href = "/post/list")}>
              게시판이동
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
