import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import styles from "../css/Main.module.css";

import INTJ from "../images/Main/INTJ.JPG";
import INTP from "../images/Main/INTP.JPG";
import ENTJ from "../images/Main/ENTJ.JPG";
import ENTP from "../images/Main/ENTP.JPG";
import INFJ from "../images/Main/INFJ.JPG";
import INFP from "../images/Main/INFP.JPG";
import ENFJ from "../images/Main/ENFJ.JPG";
import ENFP from "../images/Main/ENFP.JPG";
import ISTJ from "../images/Main/ISTJ.JPG";
import ISFJ from "../images/Main/ISFJ.JPG";
import ESTJ from "../images/Main/ESTJ.JPG";
import ESFJ from "../images/Main/ESFJ.JPG";
import ISTP from "../images/Main/ISTP.JPG";
import ISFP from "../images/Main/ISFP.JPG";
import ESTP from "../images/Main/ESTP.JPG";
import ESFP from "../images/Main/ESFP.JPG";

import { fetchLogin } from "../service/api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function Main() {
  const { login } = useAuthContext();
  const [emailAlert, setEmailAlert] = useState();
  const [pwdAlert, setPwdAlert] = useState();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(body);
    const res = await fetchLogin(body);

    if (res.message === "success") {
      login(res.userInfo);
      navigate("/list");
    } else if (res.message === "NoExist") {
      setEmailAlert("이메일을 다시 확인해주세요.");
    } else if (res.message === "PwdFail") {
      setPwdAlert("비밀번호가 올바르지않습니다.");
    }
  };

  return (
    <>
      <Container className={styles.topcontainer}>
        <Link to="#" className={styles.link}>
          <h1>Logo</h1>
        </Link>
      </Container>

      <Container className={styles.mainCon}>
        <Swiper
          className={styles.swiper}
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <img src={INTJ} alt="INTJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={INTP} alt="INTP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENTJ} alt="ENTJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENTP} alt="ENTP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={INFJ} alt="INFJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={INFP} alt="INFP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENFJ} alt="ENFJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENFP} alt="ENFP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISTJ} alt="ISTJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISFJ} alt="ISFJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESTJ} alt="ESTJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESFJ} alt="ESFJ" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISTP} alt="ISTP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISFP} alt="ISFP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESTP} alt="ESTP" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESFP} alt="ESFP" />
          </SwiperSlide>
        </Swiper>

        <Container className={styles.loginform}>
          <Form className="Login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control name="email" type="email" placeholder="Email" />
              <p className={styles.alert}>{emailAlert}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
              <p className={styles.alert}>{pwdAlert}</p>
              <Form.Text className="text-muted">
                <Link to="#" className={styles.link}>
                  아이디찾기{" "}
                </Link>
                <Link to="#" className={styles.link}>
                  비밀번호찾기{" "}
                </Link>
                <Link to="/join" className={styles.link}>
                  회원가입
                </Link>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </Container>
      </Container>

      <Container className={styles.bottom}>
        <Button variant="dark">게시판이동</Button>
      </Container>
    </>
  );
}

export default Main;
