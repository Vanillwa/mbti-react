import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link, useNavigate } from "react-router-dom";
import img from "../images/MBTI.png";
import '../css/Join.css'
import { checkDuplicationEmail, emailChanged, fetchJoin, nickNameChanged } from '../service/api';
import { checkDuplicationNickname } from '../service/api';
import { checkEmailVerification } from '../service/api'
import { requestEmailVerification } from '../service/api';


function Join() {
  console.log('rendered')
  const navigate = useNavigate()



  const [emailValidation, setEmailValidation] = useState(null);
  const [email, setEmail] = useState()
  const [emailAlert, setEmailAlert] = useState()

  const [certificationNumber, setCertificationNumber] = useState('');
  const codeRef = useRef()
  const [certificationValidation, setCertificationValidation] = useState(null);
  const [certificationAlert, setCertificationAlert] = useState('');

  // 이메일 발송번호 누를 시 input상태 disabled 해제 
  const [certificationDisabled, setcertificationDisabled] = useState(true)
  const [certificationInputDisabled, setCertificationInputDisabled] = useState(true)

  const [nicknameValidation, setNicknameValidation] = useState('')
  const [nickname, setNickname] = useState('')
  const [nicknameAlert, setNicknameAlert] = useState('')


  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');

 

  // 이메일 정규식
  const handleEmailOnInput = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(e.target.value);

    setEmail(e.target.value);

    if (isValid) {
      setEmailAlert("올바른 형식의 이메일입니다.");
      setEmailValidation("valid");
    } else {
      setEmailAlert("이메일 형식에 맞지않습니다.");
      setEmailValidation("invalid");
    }
  };
 
  








  // 이메일 입력
  const handleEmailOnBlur = async (e) => {
    if (email === e.target.value) {
      return
    } else {
      setEmail(e.target.value)
      const result = await emailChanged();
      codeRef.current.value = ''
      setEmailAlert('')
      setCertificationAlert('')
      setcertificationDisabled(true);
      setCertificationInputDisabled(true)
    }
  }




  // 이메일 중복 확인
  const handleCheckDuplicationEmail = async () => {
    if (!email || email.length < 1 || email.length > 30) {
      setEmailAlert("최소 1~30글자 이상 넣어주세요.");
      return;
    }
    const data = await checkDuplicationEmail({ email });
    if (data.message === "success") {
      setEmailAlert("사용 가능한 이메일입니다.");
      setEmailValidation('valid'); // 이메일이 사용가능
      setcertificationDisabled(false); //초기값 false

    } else if (data.message === "duplicated") {
      setEmailAlert("이미 사용중.");
      setEmailValidation('invalid'); // 이메일이 중복
      setcertificationDisabled(true);
    }
  };


  // 인증번호 요청
  const handleRequestVerificationCode = async () => {
    try {
      const response = await requestEmailVerification(email);
      console.log(response.message)
      if (response.message === 'success') {
        console.log(response.code)
        setCertificationValidation('valid')
        setCertificationAlert("인증 번호가 발송되었습니다.")

        setCertificationInputDisabled(false) // false값으로 바꿈 이건 인풋상자

      } else {
        alert('인증번호 발송에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('인증번호 요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  // 인증번호 체크
  const handleCertificationNumberInput = async (e) => {
  
    const input = codeRef.current.value
    if (input.length === 6) {
      const result = await checkEmailVerification(input)
      if (result.message === "success") {
        setCertificationAlert("인증번호가 확인되었습니다.");
        setCertificationValidation('valid');
        setcertificationDisabled(true);
        setCertificationInputDisabled(true)
      } else {
        setCertificationAlert("인증번호가 불일치합니다.");
        setCertificationValidation(null);
      }
      console.log(result)

    }
  };

  // 닉네임 정규식

  const handleNicknameOnInput = (e) => {
    setNickname(e.target.value)
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const isValid = nicknameRegex.test(e.target.value);

    if (isValid) {
      setNicknameAlert("올바른 형식의 닉네임입니다.");
      setNicknameValidation("valid");
    } else {
      setNicknameAlert("닉네임은 한글, 영문 대소문자, 숫자로 2~16자 이내여야 합니다.");
      setNicknameValidation("invalid");
    }

  }

  const handleCheckDuplicationNickname = async () => {
    if (!nickname || nickname.length < 2 || nickname.length > 20) {
      setNicknameAlert("최소 1글자 이상 10글자 이하로 입력해주세요.");
      setNicknameValidation("invalid");
      return;
    }
    const data = await checkDuplicationNickname({ nickname });
    if (data.message === "success") {
      setNicknameAlert("사용 가능한 닉네임 입니다.");
      setNicknameValidation('valid');
    } else if (data.message === "duplicated") {

      setNicknameAlert("이미 사용중.");
      setNicknameValidation('invalid');
    }
  };



 

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target)
    const mbtiValue = e.target.mbti.value;

    const body = {
      email: e.target.email.value,
      nickname: e.target.nickname.value,
      password: e.target.password.value,
      mbti: mbtiValue
    }
    const result = await fetchJoin(body)

    if (result.message === "success") {
      alert("회원가입 성공하셨습니다!.")
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
                  <input type="email" className="form-control form-control-email" name="email" id="email" placeholder="E-mail" onBlur={handleEmailOnBlur} required  onInput={handleEmailOnInput}/>
                  <button type='button' className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationEmail}>체크</button>
                </div>
                <p className='emailAlert' style={{ color: emailValidation === 'valid' ? "green" : emailValidation === 'invalid' ? "red" : "black" }}>
                  {emailAlert}
                </p>

              </div>

              <div className={(emailValidation === 'valid') ? "show" : 'hidden'} id='certification'>
                <div className='d-flex gap-2 '>
                  <input type="text" className="form-control" placeholder="인증번호" onInput={handleCertificationNumberInput} required
                    //  disabled = 함수 적용된 값 
                    disabled={certificationInputDisabled}
                    ref={codeRef} maxLength={6} />
                  <button type='button' className='btn btn-sm btn-success' onClick={handleRequestVerificationCode} disabled={certificationDisabled} >인증번호 전송</button>
                </div>
                <p style={{ color: certificationValidation === 'valid' ? "green" : "red" }}>
                  {certificationAlert}
                </p>
              </div>
              {/*  닉네임 중복 확인 */}
              <div className="col-12">
                <label htmlFor="nickname" className="form-label">닉네임</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control" name="nickname" id="nickname" placeholder="nickname" onInput={handleNicknameOnInput} maxLength={10}/>
                  <button type='button'  className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationNickname}>체크</button>
                </div>
                <p className='nicknameAlert' style={{ color: nicknameValidation === 'valid' ? "green" : nicknameValidation === 'invalid' ? "red" : "black" }}>
                  {nicknameAlert}
                </p>
              </div>
              <div className="col-12">
                <label htmlFor="user-pw" className="form-label">비밀번호</label>
                <input
                  type="password"
                  className={`form-control ${passwordValidation === 'valid' ? 'is-valid' : 'is-invalid'}`}
                  name="password"
                  id="user-pw"
                  placeholder="Password"
                  required
                  value={password}
                  onInput={handlePasswordOnInput}
                />
                <div className={`text-${passwordValidation === 'valid' ? 'success' : 'danger'}`}>{passwordAlert}</div>
              </div>

              <div className="d-flex gap-2">
                <select className="form-control" name="mbti" id="user-mbti" required>
                  <option value="">MBTI를 선택해주세요.</option>
                  <option value="INTJ">INTJ - 전략가</option>
                  <option value="INTP">INTP - 논리술사</option>
                  <option value="ENTJ">ENTJ - 지도자</option>
                  <option value="ENTP">ENTP - 변론가</option>
                  <option value="INFJ">INFJ - 옹호자</option>
                  <option value="INFP">INFP - 중재자</option>
                  <option value="ENFJ">ENFJ - 선도자</option>
                  <option value="ENFP">ENFP - 활동가</option>
                  <option value="ISTJ">ISTJ - 논리주의자</option>
                  <option value="ISFJ">ISFJ - 수호자</option>
                  <option value="ESTJ">ESTJ - 행정관</option>
                  <option value="ESFJ">ESFJ - 친선대사</option>
                  <option value="ISTP">ISTP - 장인</option>
                  <option value="ISFP">ISFP - 모험가</option>
                  <option value="ESTP">ESTP - 사업가</option>
                  <option value="ESFP">ESFP - 연예인</option>
                  <option value="">미정 - 아직 잘 모르겠습니다.</option>
                </select>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkBox1" required />
                  <label className="form-check-label" htmlFor="checkBox1">
                    <strong>[필수]</strong> 회원가입 이용약관 동의
                  </label>
                </div>
              </div>
              <div className="col-12">
                <textarea className="form-control" style={{ resize: 'none' }} rows="3" readOnly value={"국립통일교육원은 국립통일교육원 홈페이지 회원가입과 관련하여 개인정보보호법 제15조(개인정보의 수집·이용), 제17조(개인정보의 제공), 제22조(동의를 받는 방법)에 따라 참가자의 동의를 받고 있습니다. 귀하의 개인정보는 수집 목적 외 다른 목적으로는 이용하지 않으며, 귀하의 개인정보에 대한 열람, 정정·삭제, 처리정지, 이의제기 하고자 할 때에는 개인정보보호책임자를 통해 요구할 수 있으며, 개인정보침해 시 개인정보처리방침에 명시된 권익침해 구제방법을 통해 구제받을 수 있습니다."}></textarea>
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