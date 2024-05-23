import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

import { Link } from "react-router-dom";
import styles from "../css/Main.module.css";

function MainImageSlider() {
  return (
    <>
      <Swiper
        
        className={styles.swiper}
        slidesPerView={1} //한번에 보여질 갯수
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500 }} //자동슬라이드
        loop={true} //무한반복
        pagination={{ clickable: true }}>
        <SwiperSlide>
          <Link to={"/post/list?mbti=ISTJ"}>
            <img src={ISTJ} alt="ISTJ" />
          </Link>
          <p className={styles.MbitExplain}>애늙은이</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ISTP">
            <img src={ISTP} alt="ISTP" />
          </Link>
          <p className={styles.MbitExplain}>귀차니즘 </p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ISFP">
            <img src={ISFP} alt="ISFP" />
          </Link>
          <p className={styles.MbitExplain}>아프냐? 나도아프다</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ISFJ">
            <img src={ISFJ} alt="ISFJ" />
          </Link>
          <p className={styles.MbitExplain}>예민보스</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ESTP">
            <img src={ESTP} alt="ESTP" />
          </Link>
          <p className={styles.MbitExplain}>마이웨이</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ESTJ">
            <img src={ESTJ} alt="ESTJ" />
          </Link>
          <p className={styles.MbitExplain}>팩트 폭격기</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ESFP">
            <img src={ESFP} alt="ESFP" />
          </Link>
          <p className={styles.MbitExplain}>책임감없는 쾌락</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ENFJ">
            <img src={ENFJ} alt="ENFJ" />
          </Link>
          <p className={styles.MbitExplain}>급발진</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=INTP">
            <img src={INTP} alt="INTP" />
          </Link>
          <p className={styles.MbitExplain}>사이비교주</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=INTJ">
            <img src={INTJ} alt="INTJ" />
          </Link>
          <p className={styles.MbitExplain}>삐딱이</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ESFJ">
            <img src={ESFJ} alt="ESFJ" />
          </Link>
          <p className={styles.MbitExplain}>오지라퍼</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=INFJ">
            <img src={INFJ} alt="INFJ" />
          </Link>
          <p className={styles.MbitExplain}>나는 누구인가</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ENTP">
            <img src={ENTP} alt="ENTP" />
          </Link>
          <p className={styles.MbitExplain}>자아도취</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ENTJ">
            <img src={ENTJ} alt="ENTJ" />
          </Link>
          <p className={styles.MbitExplain}>
            무조건 대장
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=ENFP">
            <img src={ENFP} alt="ENFP" />
          </Link>
          <p className={styles.MbitExplain}>관종</p>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/post/list?mbti=INFP">
            <img src={INFP} alt="INFP" />
          </Link>
          <p className={styles.MbitExplain}>
          두부멘탈            
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default MainImageSlider;
