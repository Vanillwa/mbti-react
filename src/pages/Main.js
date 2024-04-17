import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {Swiper,SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper';
import 'swiper/css';


import styles from '../css/Main.module.css'
import NFtype from '../images/Main/NFtype.JPG'
import NTtype from '../images/Main/NTtype.JPG'
import SJtype from '../images/Main/SJtype.JPG'
import SPtype from '../images/Main/SPtype.JPG'


function Main(){

	return(
		<>
		<Container className={styles.container} >
		<Navbar expand="lg" className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#"><h1>Logo</h1></Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
    <div className="Mainform">
<Swiper
spaceBetween={50}
slidesPerView={1}
modules={[Autoplay]}
autoplay={{delay:2500,
disableOnInteraction:false}}
loop={true}
>
<SwiperSlide><img src={NFtype} alt="외교형" /></SwiperSlide>
  <SwiperSlide><img src={NTtype} alt="분석형" /></SwiperSlide>
  <SwiperSlide><img src={SJtype} alt="관리자형" /></SwiperSlide>
  <SwiperSlide><img src={SPtype} alt="탐험가형" /></SwiperSlide>
</Swiper>
	<Container>
	<Form className='Login-form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>아이디</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
		<Form.Text className="text-muted">
        <a href="#">아이디찾기 </a>
		<a href="#">비밀번호찾기 </a>
		<a href="/Join">회원가입</a>
		  </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        로그인
      </Button>
    </Form>
	</Container>
  </div>

	<Container className='footer'>
	<Button variant="dark">게시판이동</Button>
	</Container>
	
		</>
	)

}

export default Main;
