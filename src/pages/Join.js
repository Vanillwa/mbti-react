import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.avif'
import img from "../images/MBTI.png";

function Join() {
  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div>
      <Link to="/">
        <img src={logo} alt="로고"/>
      </Link>
      <div>
        <div>
          <form>
            <div>
              <img src={img} alt="회원사진"/>
              <h2>가입하기</h2>
            </div>
            <div>
              <div>
                <label htmlFor="first-name">이름</label>
                <input type="text" name="firstName" id="first-name" placeholder="이름" />
              </div>
              <div>
                <label htmlFor="last-name">성</label>
                <input type="text" name="lastName" id="last-name" placeholder="성" />
              </div>
              <div>
                <label htmlFor="user-name">휴대폰 번호 또는 이메일</label>
                <input type="text" name="username" id="user-name" placeholder="E-mail" />
              </div>
              <div>
                <label htmlFor="user-pw">비밀번호</label>
                <input type="password" name="password" id="user-pw" placeholder="Password" />
              </div>
              <div>
                <input type="checkbox" id="checkBox1" />
                <label htmlFor="checkBox1">[필수] 회원가입 이용약관 동의</label>
              </div>
              <div>
                <input type="checkbox" id="checkBox2" />
                <label htmlFor="checkBox2">[필수] 개인정보 수집 및 이용 동의</label>
              </div>
              <div>
                <input type="checkbox" id="checkBox3" />
                <label htmlFor="checkBox3">[선택] 마케팅 정보 수신 동의</label>
              </div>
              <div>
                <button type="button" onClick={() => navigate('/')}>가입하기</button>
                <button type="button" onClick={() => navigate('/')}>취소</button>
                <Link to="/">이미 계정이 있으신가요? 로그인</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;