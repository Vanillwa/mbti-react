import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import '../css/Join.css'



function Join() {
  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="text-center mb-5">
              <img src={img} alt="회원사진" className="user-image" />
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>가입하기</h2>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="first-name" className="form-label">이름</label>
                <input type="text" className="form-control" name="firstName" id="first-name" placeholder="이름" />
              </div>
              <div className="col-md-6">
                <label htmlFor="last-name" className="form-label">성</label>
                <input type="text" className="form-control" name="lastName" id="last-name" placeholder="성" />
              </div>
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">휴대폰 번호 또는 이메일</label>
                <input type="text" className="form-control" name="username" id="user-name" placeholder="E-mail" />
              </div>
              <div className="col-12">
                <label htmlFor="user-pw" className="form-label">비밀번호</label>
                <input type="password" className="form-control" name="password" id="user-pw" placeholder="Password" />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkBox1" />
                  <label className="form-check-label" htmlFor="checkBox1">
                    <strong>[필수]</strong> 회원가입 이용약관 동의
                  </label>
                </div>
              </div>
              <div className="col-12">
                <textarea className="form-control" style={{ resize: 'none' }} rows="5" readOnly>이용약관 내용</textarea>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkBox2" />
                  <label className="form-check-label" htmlFor="checkBox2">
                    <strong>[필수]</strong> 개인정보 수집 및 이용 동의
                  </label>
                </div>
              </div>
              <div className="col-12">
                <textarea className="form-control" style={{ resize: 'none' }} rows="5" readOnly>개인정보 수집 및 이용 내용</textarea>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkBox3" />
                  <label className="form-check-label" htmlFor="checkBox3">
                    <strong>[선택]</strong> 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>
              <div className="col-12">
                <textarea className="form-control" style={{ resize: 'none' }} rows="3" readOnly>마케팅 정보 수신 동의 내용</textarea>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button type="button" className="btn btn-primary me-2" onClick={() => navigate('/')}>가입하기</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>취소</button>
                  <Link to="/" className="text-decoration-none ms-2">이미 계정이 있으신가요? 로그인</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;