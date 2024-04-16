import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 일단은 확인과 뒤로가기 버튼 누를시 메인으로 가게해뒀습니다.
function Join() {
  const goMain = () => {
    window.location.href = '/';
  };
  const goBack = () => {
    window.location.href = '/';
  };

  /* 추후  추후에 백엔드 API와 연동 시 쓸 곳 */




  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="text-center mb-5">
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>
                가입하기
              </h2>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="first-name" className="form-label">이름</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="first-name"
                  placeholder="이름"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="last-name" className="form-label">성</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="last-name"
                  placeholder="성"
                />
              </div>
             
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">휴대폰 번호 또는 이메일</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="user-name"
                  placeholder="E-mail"
                />
              </div>          
              <div className="col-12">
                <label htmlFor="user-pw" className="form-label">비밀번호</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="user-pw"
                  placeholder="Password"
                />
              </div>
             <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkBox1"
              />
              <label className="form-check-label" htmlFor="checkBox1">
                <strong>[필수]</strong> 회원가입 이용약관
              </label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              style={{ resize: 'none' }}
              rows="5"
              readOnly
            >다른 사이트 이용약관보고 추후 적을 것</textarea>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkBox2"
              />
              <label className="form-check-label" htmlFor="checkBox2">
                <strong>[필수]</strong> 개인정보 수집 및 이용
              </label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              style={{ resize: 'none' }}
              rows="5"
              readOnly
            >다른 사이트 이용약관보고 추후 적을 것</textarea>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkBox3"
              />
              <label className="form-check-label" htmlFor="checkBox3">
                <strong>[선택]</strong> 실명인증된 아이디로 가입
              </label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              style={{ resize: 'none' }}
              rows="3"
              readOnly
            >다른 사이트 이용약관보고 추후 적을 것</textarea>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkBox4"
              />
              <label className="form-check-label" htmlFor="checkBox4">
                <strong>[선택]</strong> 위치기반서비스 이용약관
              </label>
            </div>
          </div>
              <div className="col-12 d-flex justify-content-center">
                {/*  나중에 확인은 submit으로 바꿀예정입니다. */}
                <button type="button" className="btn btn-primary me-2" onClick={goMain}>확인</button>
                <button type="button" className="btn btn-secondary" onClick={goBack}>뒤로가기</button>
                {/* 메인 로그인 창 이동 */}
                <a href="/" className="text-decoration-none">혹시 계정이 있으신가요?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;