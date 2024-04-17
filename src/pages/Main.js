import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {Swiper,SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper';
import 'swiper/css';

import styles from '../css/Main.module.css'



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
  <SwiperSlide></SwiperSlide>
  <SwiperSlide>22</SwiperSlide>
  <SwiperSlide>33</SwiperSlide>
  <SwiperSlide>44</SwiperSlide>
  <SwiperSlide>11</SwiperSlide>
  <SwiperSlide>22</SwiperSlide>
  <SwiperSlide>33</SwiperSlide>
  <SwiperSlide>44</SwiperSlide>
  <SwiperSlide>11</SwiperSlide>
  <SwiperSlide>22</SwiperSlide>
  <SwiperSlide>33</SwiperSlide>
  <SwiperSlide>44</SwiperSlide>
  <SwiperSlide>11</SwiperSlide>
  <SwiperSlide>22</SwiperSlide>
  <SwiperSlide>33</SwiperSlide>
  <SwiperSlide>44</SwiperSlide>
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
