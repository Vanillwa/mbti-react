import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/areyout.png';
import { Link, useNavigate } from "react-router-dom";
import styles from '../css/Join.module.css';
import { checkDuplicationEmail, emailChanged, fetchJoin, nickNameChanged } from "../service/api/joinAPI";
import { checkDuplicationNickname } from "../service/api/joinAPI";
import { checkEmailVerification } from "../service/api/joinAPI"
import { requestEmailVerification } from "../service/api/joinAPI";
import Swal from "sweetalert2"
import Footer from '../component/Footer';
import sweetalert from '../component/sweetalert';
//import backgroundImg from '../images/backgroundImg.png';


function Join() {
  console.log('rendered')
  const navigate = useNavigate()


  // email
  const [email, setEmail] = useState()
  const emailRef = useRef()
  const [emailAlert, setEmailAlert] = useState()
  const [emailValidation, setEmailValidation] = useState('invalid');

  // 인증번호
  const [certificationNumber, setCertificationNumber] = useState('');
  const codeRef = useRef()
  const [certificationValidation, setCertificationValidation] = useState('invalid');
  const [certificationAlert, setCertificationAlert] = useState('');

  // 이메일 발송번호 누를 시 input상태 disabled 해제 
  const [certificationDisabled, setCertificationDisabled] = useState(true)
  const [certificationInputDisabled, setCertificationInputDisabled] = useState(true)

  // 닉네임
  const [nickname, setNickname] = useState('')
  const nicknameRef = useRef()
  const [nicknameAlert, setNicknameAlert] = useState('')
  const [nicknameValidation, setNicknameValidation] = useState('invalid')

  // 비밀번호
  const passwordRef1 = useRef()
  const passwordRef2 = useRef()
  const [passwordAlert, setPasswordAlert] = useState('');
  const [passwordAlert2, setPasswordAlert2] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('invalid');
  const [passwordSame, setPasswordSame] = useState(false);

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
      setCertificationDisabled(true);
      setCertificationInputDisabled(true)
    }
  }

  // 이메일 중복 확인
  const handleCheckDuplicationEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailRef.current.value)) {
      setEmailAlert("이메일 형식에 맞지않습니다.");
      return
    }

    const data = await checkDuplicationEmail({ email });
    if (data.message === "success") {
      setEmailAlert("사용 가능한 이메일입니다.");
      setEmailValidation('valid'); // 이메일이 사용가능
      setCertificationDisabled(false); //초기값 false
    } else if (data.message === "duplicated") {
      setEmailAlert("이미 사용중.");
      setEmailValidation('invalid'); // 이메일이 중복
      setCertificationDisabled(true);
    }
  };


  // 인증번호 요청
  const handleRequestVerificationCode = async () => {
    try {
      const response = await requestEmailVerification(email);
      console.log(response)
      if (response.message === 'success') {
        console.log("인증번호 : ", response.code)
        setCertificationValidation('valid');
        setCertificationAlert("인증 번호가 발송되었습니다.")
        setCertificationInputDisabled(false) // false값으로 바꿈 이건 인풋상자
      } else {
        sweetalert.error('인증번호 발송에 실패했습니다. 나중에 다시 시도해주세요.','','확인');
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
        setCertificationDisabled(true);
        setCertificationInputDisabled(true)
      } else {
        setCertificationAlert("인증번호가 불일치합니다.");
        setCertificationValidation('invalid');
      }
    } else {
      setCertificationAlert("");
    }
  };

  // 닉네임 입력
  const handleNickNameOnBlur = async (e) => {
    if (nickname === e.target.value) {
      return
    } else {
      setNickname(e.target.value);
      const result = await nickNameChanged();
      setNicknameAlert("");
    }
  };

  // 닉네임 중복 체크
  const handleCheckDuplicationNickname = async () => {
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/;
    if (!nicknameRegex.test(nicknameRef.current.value)) {
      setNicknameAlert("닉네임은 한글, 영문 대소문자, 숫자로 2~16자 이내여야 합니다.");
      setNicknameValidation('invalid');
      return
    }
    const data = await checkDuplicationNickname({ nickname })

    if (data.message === "success") {
      setNicknameAlert("사용 가능한 닉네임 입니다.");
      setNicknameValidation('valid');
    } else if (data.message === "duplicated") {
      setNicknameAlert("이미 사용중.");
      setNicknameValidation('invalid');
    }
  };

 
  const comparePassword = () => {
    if (passwordRef1.current.value === passwordRef2.current.value) {
      setPasswordAlert2("비밀번호가 일치합니다.")
      setPasswordSame(true)
    } else {
      setPasswordAlert2("비밀번호가 일치하지 않습니다.")
      setPasswordSame(false)
    }
    console.log(passwordSame)
  }

  // 첫번째 비밀번호 입력
  const handlePasswordOnInput = (e) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,20}$/;

    if (e.target.value === '') {
      setPasswordAlert("");
      setPasswordValidation("invalid");
      setPasswordAlert2("")
      setPasswordSame(false)
      return
    }
    if (passwordRegex.test(e.target.value)) {

      setPasswordAlert("올바른 형식의 비밀번호 입니다.");
      setPasswordValidation("valid");
      comparePassword()
    }
    else {
      passwordRef2.current.value = ''
      setPasswordAlert("비밀번호는 최소 6자, 최대 20자이며 한글은 사용할 수 없습니다. 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.");
      setPasswordValidation("invalid");
    }


  };

  // 두번째 비밀번호 재입력

  const handlePasswordOnInput2 = (e) => {
    comparePassword()
  }

  // 회원가입 
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (emailValidation === 'invalid') {
      alert('이메일 중복체크 요망')
      emailRef.current.focus()
      return
    }
    if (certificationValidation === 'invalid') {
      alert('이메일 인증 요망')
      return
    }
    if (nicknameValidation === 'invalid') {
      alert('닉네임 중복체크 요망')
      nicknameRef.current.focus()
      return
    }

    if (passwordValidation === 'invalid') {
      alert('올바르지 않은 비밀번호 형식')
      passwordRef1.current.focus()
      return
    }

    
    if (!passwordSame) {
      alert("비밀번호가 일치하지 않습니다.")
      passwordRef2.current.focus()
      return
    }

    const body = {
      email: e.target.email.value,
      nickname: e.target.nickname.value,
      password: e.target.password.value,
      mbti: e.target.mbti.value
    }
    const result = await fetchJoin(body)


    if (result.message === "success") {
      Swal.fire({
        title: '성공!',
        text: '회원가입에 성공하셨습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      }).then(() => {
        if (result.message === "success") {
          navigate("/")
        }
      })

    } else {
      Swal.fire({
        title: '실패',
        text: '회원가입에 실패하셨습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      })
    }
  }

  return (
 
    <div className="container mt-5 c1">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className={styles.logo} />
      </Link>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-5">

              <h2 className="fw-bold" style={{ fontSize: '45px', color: "#0866ff" }}>회원가입</h2>
            </div>
            <div className="row g-3">

              {/* email 전송  */}
              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  <input type="email" className="form-control form-control-email" name="email" id="email" placeholder="E-mail" ref={emailRef} onBlur={handleEmailOnBlur} required />
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
                  <input type="text" className="form-control" name="nickname" id="nickname" placeholder="nickname" maxLength={16} onBlur={handleNickNameOnBlur} ref={nicknameRef} required />
                  <button type='button' className='col-2 btn btn-sm btn-primary' onClick={handleCheckDuplicationNickname}>체크</button>
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

                  onInput={handlePasswordOnInput}
                  ref={passwordRef1}
                />
                <div className={`text-${passwordValidation === 'valid' ? 'success' : 'danger'}`}>{passwordAlert}</div>


                <input type="password" className={`form-control ${passwordValidation === 'valid' ? '' : 'hidden'}`} name="repassword" id="user-pw" placeholder="password" ref={passwordRef2} onInput={handlePasswordOnInput2} />
                <div className={`text-${passwordSame === true ? 'success' : 'danger'}`}>{passwordAlert2}</div>
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
                    <strong>[<strong style={{ color: "red" }}>필수</strong>] </strong>회원가입 이용약관 동의
                  </label>
                </div>
              </div>
              <div className="col-12">
                <textarea className="form-control" style={{ resize: 'none' }} rows="3" readOnly value={"국립통일교육원은 국립통일교육원 홈페이지 회원가입과 관련하여 개인정보보호법 제15조(개인정보의 수집·이용), 제17조(개인정보의 제공), 제22조(동의를 받는 방법)에 따라 참가자의 동의를 받고 있습니다. 귀하의 개인정보는 수집 목적 외 다른 목적으로는 이용하지 않으며, 귀하의 개인정보에 대한 열람, 정정·삭제, 처리정지, 이의제기 하고자 할 때에는 개인정보보호책임자를 통해 요구할 수 있으며, 개인정보침해 시 개인정보처리방침에 명시된 권익침해 구제방법을 통해 구제받을 수 있습니다."}></textarea>
              </div>
              <div className="col-12 d-flex justify-content-center">

                <button type="submit" className="btn btn-primary me-2" >가입하기</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>취소</button>
                <Link to="/" className="text-decoration-none ms-2"><strong>이미 계정이 있으신가요? 로그인</strong></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
   



  );
}

export default Join;