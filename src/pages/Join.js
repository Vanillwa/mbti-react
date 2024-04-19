import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import '../css/Join.css'
import { checkDuplicationEmail, emailChanged, fetchJoin } from '../service/api';
import { checkDuplicationNickname } from '../service/api';
import {checkEmailVerification}  from '../service/api'
import { requestEmailVerification } from '../service/api';



function Join() {

// checkCertification


// 이메일 인증
const [certificationNumber, setCertificationNumber] = useState('');
const [certificationValidation, setCertificationValidation] = useState(null);
const [certificationAlert, setCertificationAlert] = useState('');



// 이메일 발송번호 누를 시 input상태 disabled 해제 
const [certificationDisabled, setcertificationDisabled] = useState(true)
const [certificationInputDisabled,setCertificationInputDisabled] = useState(true)




const handleCertificationNumberInput = async(e) => {
  const input = e.target.value;
  if (input.length === 6) {
    const result = await checkEmailVerification(input)
    if(result==="success"){
      setCertificationAlert("인증번호가 확인되었습니다.");
      setCertificationValidation('valid');
    }
    console.log(result)
    
  }
};




// 체크박스 밑에 발송 이랑 검사 버튼
const handlecheckEmailVerification = async () => {
  try {
    const data = await checkEmailVerification({ certificationNumber });
    // 여기서 certificationNumber 상태의 길이를 직접 확인합니다.
    if (certificationNumber.length === 6) {
      console.log("success")
      setCertificationAlert("인증번호가 확인되었습니다.");
      setCertificationValidation('valid');
    } else {
      setCertificationAlert("인증번호가 유효하지 않습니다.");
      setCertificationValidation('invalid');
    }
  } catch (error) {
    console.error('인증번호 확인 중 오류 발생:', error);
    setCertificationAlert("인증번호 확인 중 오류가 발생했습니다.");
    setCertificationValidation('invalid');
  }
};



  const navigate = (path) => {
    window.location.href = path;
  };






  // 이메일 중첩 확인
  const [emailValidation, setEmailValidation] = useState(null);
  const [email, setEmail] = useState()
  const [emailAlert, setEmailAlert] = useState()


  // const handleEmailOninput = (e) => {
  //   setEmail(e.target.value)
  // }

  const handleCheckDuplicationEmail = async () => {
    console.log("check");
    if (!email || email.length < 1 || email.length > 30) {
      setEmailAlert("최소 1~30글자 이상 넣어주세요.");
      return;
    }
    const data = await checkDuplicationEmail({ email });
    if (data.message === "success") {
      setEmailAlert("사용 가능.");
      setEmailValidation('valid'); // 이메일이 사용가능
      setcertificationDisabled(false); //초기값 false
     
    } else if (data.message === "duplicated") {
      setEmailAlert("이미 사용중.");
      setEmailValidation('invalid'); // 이메일이 중복
    }
  };

  // 이메일 발송 기능

  const handleEmailOnInput = (e) => {
    // 값 변경 시 onch
    setEmail(e.target.value);

  };


  const [sendMessage,setSendMessage] =useState("")

  
  const handleRequestVerificationCode = async () => {
    try {
      const response = await requestEmailVerification(email);
      console.log(response.message)
      if (response.message === 'success') {
        // 이메일창 말고 콘솔창에서 보낸 코드 봄.
        console.log(response.code)
       
         setSendMessage("인증 번호가 발송되었습니다.")
         // false값으로 바꿈 이건 인풋상자
         setCertificationInputDisabled(false)

        // 인증번호를 받을 시 input상자 해제 
       
      } else {
        alert('인증번호 발송에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('인증번호 요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };


  // 닉네임 중첩 확인

  const [nicknameValidation, setNicknameValidation] = useState()
  const [nickname, setNickname] = useState()
  const [nicknameAlert, setNicknameAlert] = useState()

  const handleNicknameOnInput =(e) =>{
    setNickname(e.target.value)
  }

 const handleCheckDuplicationNickname = async () => {
    if (!nickname || nickname.length < 1 || nickname.length > 20) {
      setNicknameAlert("최소 1글자 이상 20글자 이하로 입력해주세요.");
      return;
    }
    const data = await checkDuplicationNickname({ nickname });
    console.log(data.message)
    if (data === "success") {

      setNicknameAlert("사용 가능.");
      setNicknameValidation('valid');   
    } else if (data === "duplicated") {

      setNicknameAlert("이미 사용중.");
      setNicknameValidation('invalid'); 
    }
  };
 
  const handleEmailOnChange = async()=>{
  const result = await emailChanged()

  }


const handleSubmit =async(e)=>{
  e.preventDefault()
  console.log(e.target)

  const body = {
    email : e.target.email.value,
    nickname : e.target.nickname.value,
    password : e.target.password.value,
    mbti : null
  }
  const result =  await fetchJoin(body)
  if(result.message === "success"){
      alert("회원가입 성공하셨습니다.")
      navigate("/")

  }

}




  return (
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-5">
              <img src={img} alt="회원사진" className="user-image" />
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>가입하기</h2>
            </div>
            <div className="row g-3">

              {/* email 전송  */}
              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control form-control-email" name="email" id="email" placeholder="E-mail" onInput={handleEmailOnInput} onChange={handleEmailOnChange} /> 
                  <button type='button' className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationEmail}>체크</button>
                </div>
                <p className='emailAlert' style={{color: emailValidation === 'valid' ? "green" : emailValidation === 'invalid' ? "red" : "black"}}>
                  {emailAlert}
                </p>
              
              </div> 
                                                
            <div className={(emailValidation === 'valid') ? "show" : 'hidden'} id='certification'>
              <div className='d-flex gap-2 '>
                <input type="text" className="form-control" placeholder="인증번호" onInput={handleCertificationNumberInput} 
                //  disabled = 함수 적용된 값 
                disabled = {certificationInputDisabled} />                             
                    <button type='button' className='btn btn-sm btn-success' onClick={handleRequestVerificationCode} disabled = {certificationDisabled} >인증번호 전송</button>                              
                  </div>
                 <p style={{color: certificationValidation === 'valid' ? "green" : "red"}}>
                 {certificationAlert}
                 </p>  
                 {/*  발송버튼 누를 시 락 해제 후  메세지 발생  */}
                 <p style={{color : "green"}}>{sendMessage}</p>
            </div>
              {/*  닉네임 중복 확인 */}
              <div className="col-12">
                <label htmlFor="nickname" className="form-label">닉네임</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control" name="nickname" id="nickname" placeholder="nickname" onInput={handleNicknameOnInput} />
                  <button type='button' className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationNickname}>체크</button>
                </div>
                <p className='nicknameAlert' style={{color: nicknameValidation === 'valid' ? "green" : nicknameValidation === 'invalid' ? "red" : "black"}}>
                    {nicknameAlert}
                </p>
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
             
                <button type="submit" className="btn btn-primary me-2" >가입하기</button>
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