import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper";
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

 function MainImageSlider(){
    return(
        <>
        <Swiper
              navigation={true}
              className={styles.swiper}
             
              slidesPerView={1} //한번에 보여질 갯수
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 2500 }} //자동슬라이드
              loop={true} //무한반복
              pagination={{ clickable: true }}>
              
              <SwiperSlide>
                <Link to={"/post/list?mbti=ISTJ"}>
                  <img src={ISTJ} alt="ISTJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  책임감이 강하며, 현실적입니다.
                </p>
                <p className={styles.MbitExplain}>
                  매사에 철저하고 보수적입니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ISTP">
                  <img src={ISTP} alt="ISTP" />
                </Link>
                <p className={styles.MbitExplain}>과묵하고 분석적이며, </p>
                <p className={styles.MbitExplain}>적응력이 강합니다.</p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ISFP">
                  <img src={ISFP} alt="ISFP" />
                </Link>
                <p className={styles.MbitExplain}>온화하고 겸손합니다.</p>
                <p className={styles.MbitExplain}>삶의 여유를 만끽합니다.</p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ISFJ">
                  <img src={ISFJ} alt="ISFJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  차분하고 헌식적이며, 인내심이 강합니다.
                </p>
                <p className={styles.MbitExplain}>
                  타인의 감정변화를 신경씁니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ESTP">
                  <img src={ESTP} alt="ESTP" />
                </Link>
                <p className={styles.MbitExplain}>
                  느긋하고, 관용적이며, 타협을 잘합니다.
                </p>
                <p className={styles.MbitExplain}>
                  현실적 문제 해결에 능숙합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ESTJ">
                  <img src={ESTJ} alt="ESTJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  체계적으로 일하고, 규칙을 준수합니다.
                </p>
                <p className={styles.MbitExplain}>
                  사실적 목표 설정에 능합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ESFP">
                  <img src={ESFP} alt="ESFP" />
                </Link>
                <p className={styles.MbitExplain}>
                  호기심이 많으며, 개방적입니다.
                </p>
                <p className={styles.MbitExplain}>
                  구체적인 사실을 중요시합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ENFJ">
                  <img src={ENFJ} alt="ENFJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  사교적이고, 타인의 의견을 존중합니다.
                </p>
                <p className={styles.MbitExplain}>
                  비판을 받으면 예민하게 반응합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=INTP">
                  <img src={INTP} alt="INTP" />
                </Link>
                <p className={styles.MbitExplain}>지적 호기심이 높으며,</p>
                <p className={styles.MbitExplain}>
                  잠재력과 가능성을 중요시합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=INTJ">
                  <img src={INTJ} alt="INTJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  의지가 강하고, 독립적입니다.
                </p>
                <p className={styles.MbitExplain}>분석력이 뛰어납니다.</p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ESFJ">
                  <img src={ESFJ} alt="ESFJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  사람에 대한 관심이 많습니다.
                </p>
                <p className={styles.MbitExplain}>
                  친절하고, 동정심이 많습니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=INFJ">
                  <img src={INFJ} alt="INFJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  공동체의 이익을 중요시합니다.
                </p>
                <p className={styles.MbitExplain}>사람들에게 영감을 줍니다.</p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ENTP">
                  <img src={ENTP} alt="ENTP" />
                </Link>
                <p className={styles.MbitExplain}>
                  박학다식하고, 독창적입니다.
                </p>
                <p className={styles.MbitExplain}>
                  끊임없이 새로운 시도를 합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ENTJ">
                  <img src={ENTJ} alt="ENTJ" />
                </Link>
                <p className={styles.MbitExplain}>
                  철저한 준비를 하며, 활동적입니다.
                </p>
                <p className={styles.MbitExplain}>
                  통솔력이 있으며, 단호합니다.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=ENFP">
                  <img src={ENFP} alt="ENFP" />
                </Link>
                <p className={styles.MbitExplain}>상상력이 풍부하고,</p>
                <p className={styles.MbitExplain}>순발력이 뛰어납니다.</p>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/post/list?mbti=INFP">
                  <img src={INFP} alt="INFP" />
                </Link>
                <p className={styles.MbitExplain}>
                  성실하고 이해심이 많고, 개방적입니다.
                </p>
                <p className={styles.MbitExplain}>내적 신념이 강합니다.</p>
              </SwiperSlide>
            </Swiper>
        </>
    )
 }

 export default MainImageSlider