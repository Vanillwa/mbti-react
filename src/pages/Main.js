import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper";
import "swiper/css";

import styles from "../css/Main.module.css";
import NFtype from "../images/Main/NFtype.JPG";
import NTtype from "../images/Main/NTtype.JPG";
import SJtype from "../images/Main/SJtype.JPG";
import SPtype from "../images/Main/SPtype.JPG";
import { fetchLogin } from "../service/api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function Main() {
  const {login} = useAuthContext()
  const [emailAlert,setEmailAlert] = useState() 
  const [pwdAlert,setPwdAlert] = useState()

 const navigate = useNavigate()
const handleSubmit = async(e)=>{
  e.preventDefault()
  let body= {
    email:e.target.email.value,
    password:e.target.password.value
  }
  console.log(body)
  const res=await fetchLogin(body)

  if(res.message === "success"){
    login(res.userInfo)
   navigate("/list")
  }
  else if(res.message === "NoExist"){
    setEmailAlert("이메일을 다시 확인해주세요.")
  }
  else if(res.message === "PwdFail"){
    setPwdAlert("비밀번호가 올바르지않습니다.")
  }
}

  return (
    <>
      <Container className={styles.topcontainer}>
             <Link to="#" className={styles.link}><h1 >Logo</h1></Link> 
      </Container>

      <Container className={styles.mainCon}>
        <Swiper
          className={styles.swiper}
          spaceBetween={50}
          slidesPerView={1}
         
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false}}
          loop={true}>
          <SwiperSlide>
            <img src={NFtype} alt="외교형" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={NTtype} alt="분석형" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={SJtype} alt="관리자형" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={SPtype} alt="탐험가형" />
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
              <Form.Control name="password" type="password" placeholder="Password" />
                <p className={styles.alert}>{pwdAlert}</p>
              <Form.Text className="text-muted">
                <Link to="#" className={styles.link} >아이디찾기 </Link>
                <Link to="#" className={styles.link}>비밀번호찾기 </Link>
                <Link to="/join" className={styles.link}>회원가입</Link>
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
