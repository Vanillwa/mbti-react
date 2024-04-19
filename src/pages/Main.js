import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import styles from "../css/Main.module.css";

import INTJ from "../images/Main/INTJ.png";
import INTP from "../images/Main/INTP.png";
import ENTJ from "../images/Main/ENTJ.png";
import ENTP from "../images/Main/ENTP.png";
import INFJ from "../images/Main/INFJ.png";
import INFP from "../images/Main/INFP.png";
import ENFJ from "../images/Main/ENFJ.png";
import ENFP from "../images/Main/ENFP.png";
import ISTJ from "../images/Main/ISTJ.png";
import ISFJ from "../images/Main/ISFJ.png";
import ESTJ from "../images/Main/ESTJ.png";
import ESFJ from "../images/Main/ESFJ.png";
import ISTP from "../images/Main/ISTP.png";
import ISFP from "../images/Main/ISFP.png";
import ESTP from "../images/Main/ESTP.png";
import ESFP from "../images/Main/ESFP.png";
import logo from '../images/logo.avif';

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
        <Link to="/" className={styles.link}>
          <img className={styles.logo} src={logo}></img>
        </Link>
      </Container>

      <Container className={styles.mainCon}>
       <Row>
        <Col md={7}>
        <Swiper
          className={styles.swiper}
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <img src={ISTJ} alt="ISTJ" />
            <p className={styles.MbitExplain}>책임감이 강하며, 현실적입니다.</p>
            <p className={styles.MbitExplain}>매사에 철저하고 보수적입니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISTP} alt="ISTP" />
            <p className={styles.MbitExplain}>과묵하고 분석적이며, </p>
            <p className={styles.MbitExplain}>적응력이 강합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISFP} alt="ISFP" />
            <p className={styles.MbitExplain}>온화하고 겸손합니다.</p>
            <p className={styles.MbitExplain}>삶의 여유를 만끽합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ISFJ} alt="ISFJ" />
            <p className={styles.MbitExplain}>차분하고 헌식적이며, 인내심이 강합니다.</p>
            <p className={styles.MbitExplain}>타인의 감정변화를 신경씁니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESTP} alt="ESTP" />
            <p className={styles.MbitExplain}>느긋하고, 관용적이며, 타협을 잘합니다.</p>
            <p className={styles.MbitExplain}>현실적 문제 해결에 능숙합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESTJ} alt="ESTJ" />
            <p className={styles.MbitExplain}>체계적으로 일하고, 규칙을 준수합니다.</p>
            <p className={styles.MbitExplain}>사실적 목표 설정에 능합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESFP} alt="ESFP" />
            <p className={styles.MbitExplain}>호기심이 많으며, 개방적입니다.</p>
            <p className={styles.MbitExplain}>구체적인 사실을 중요시합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENFJ} alt="ENFJ" />
            <p className={styles.MbitExplain}>사교적이고, 타인의 의견을 존중합니다.</p>
            <p className={styles.MbitExplain}>비판을 받으면 예민하게 반응합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={INTP} alt="INTP" />
            <p className={styles.MbitExplain}>지적 호기심이 높으며,</p>
            <p className={styles.MbitExplain}>잠재력과 가능성을 중요시합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={INTJ} alt="INTJ" />
            <p className={styles.MbitExplain}>의지가 강하고, 독립적입니다.</p>
            <p className={styles.MbitExplain}>분석력이 뛰어납니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ESFJ} alt="ENFJ" />
            <p className={styles.MbitExplain}>사람에 대한 관심이 많습니다. </p>
            <p className={styles.MbitExplain}>친절하고, 동정심이 많습니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={INFJ} alt="INFJ" />
            <p className={styles.MbitExplain}>공동체의 이익을 중요시합니다.</p>
            <p className={styles.MbitExplain}>사람들에게 영감을 줍니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENTP} alt="ENTP" />
            <p className={styles.MbitExplain}>박학다식하고, 독창적입니다.</p>
            <p className={styles.MbitExplain}>끊임없이 새로운 시도를 합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENTJ} alt="ENTJ" />
            <p className={styles.MbitExplain}>철저한 준비를 하며, 활동적입니다.</p>
            <p className={styles.MbitExplain}>통솔력이 있으며, 단호합니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={ENFP} alt="ENFP" />
            <p className={styles.MbitExplain}>상상력이 풍부하고,</p>
            <p className={styles.MbitExplain}>순발력이 뛰어납니다.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={INFP} alt="INFP" />
            <p className={styles.MbitExplain}>성실하고 이해심이 많고, 개방적입니다.</p>
            <p className={styles.MbitExplain}>내적 신념이 강합니다.</p>
          </SwiperSlide>
        </Swiper>
        </Col>


        <Col md={5}>
          <Form className={`Login-form ${styles.loginform}`} onSubmit={handleSubmit}>
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
               
                <Link to="/findpwd" className={styles.link}>
                  비밀번호찾기
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
          </Col>
          </Row>
      </Container>

      <Container className={styles.bottom}>
        <Button variant="dark" >게시판이동</Button>
      </Container>
    </>
  );
}

export default Main;
