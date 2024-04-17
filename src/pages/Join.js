import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import '../css/Join.css'
import { checkDuplicationEmail } from '../service/api';




function Join() {


  const [emailValidation, setEmailValidation] = useState(null);
  const [email, setEmail] = useState()
  const [emailAlert, setEmailAlert] = useState()
  const navigate = (path) => {
    window.location.href = path;
  };

  const handleEmailOninput = (e) => {
    setEmail(e.target.value)
  }


  

  const handleCheckDuplicationEmail = async () => {
    console.log("check");
    const data = await checkDuplicationEmail({ email });
    if (data === "success") {
      setEmailAlert("사용 가능.");
      setEmailValidation('valid'); // 이메일이 사용가능
     
    } else if (data === "duplicated") {
      setEmailAlert("이미 사용중.");
      setEmailValidation('invalid'); // 이메일이 중복
      
    }
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


              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  {/* <input type="text" className="form-control" name="email" id="email" placeholder="E-mail" onInput={handleEmailOninput} /> */}
               <input type="text" className="form-control form-control-email" name="email" id="email" placeholder="E-mail" onInput={handleEmailOninput} /> 
                  <button type='button' className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationEmail}>체크</button>
                  <p className='emailAlert' style={{color: emailValidation === 'valid' ? "green" : emailValidation === 'invalid' ? "red" : "black"}}>
                    {emailAlert}
                  </p>
                  
                </div>
              </div>
              <div className="hidden" id='certification'>
                <div className='d-flex gap-2 '>
                  <input type="text" className="form-control" name="email" id="email" placeholder="인증번호" />
                  <button type='button' className='col-2 btn btn-sm btn-primary'>체크</button>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="nickname" className="form-label">닉네임</label>
                <input type="text" className="form-control" name="nickname" id="nickname" placeholder="nickname" />
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
                <textarea className="form-control" style={{ resize: 'none' }} rows="3" readOnly>국립통일교육원은 국립통일교육원 홈페이지 회원가입과 관련하여 개인정보보호법 제15조(개인정보의 수집·이용), 제17조(개인정보의 제공), 제22조(동의를 받는 방법)에 따라 참가자의 동의를 받고 있습니다. 귀하의 개인정보는 수집 목적 외 다른 목적으로는 이용하지 않으며, 귀하의 개인정보에 대한 열람, 정정·삭제, 처리정지, 이의제기 하고자 할 때에는 개인정보보호책임자를 통해 요구할 수 있으며, 개인정보침해 시 개인정보처리방침에 명시된 권익침해 구제방법을 통해 구제받을 수 있습니다.</textarea>
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