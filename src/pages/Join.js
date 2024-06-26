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
import { Modal, Button } from 'react-bootstrap';


function Join() {

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


  const [emailValidColor, setEmailValidColor] = useState("")
  const [passwordValidColor, setPasswordValidColor] = useState("");
  const [nicknameVailidColor, setNicknameVaildColor] = useState("")


  const [mbtiDescription,setMbtiDescription] =useState('')
  // 설명서 모달
  const [showModal1, setShowModal1] = useState(false);
  //객체 너 mbti 모달
  const [showModal2, setShowModal2] = useState(false);


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
      setEmailValidColor("")
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
      setEmailValidColor("is-valid")
    } else if (data.message === "duplicated") {
      setEmailAlert("이미 사용중.");
      setEmailValidation('invalid'); // 이메일이 중복
      setCertificationDisabled(true);
      setEmailValidColor("is-invalid")
    }
  };


  // 인증번호 요청
  const handleRequestVerificationCode = async () => {
    try {
      const response = await requestEmailVerification(email);
      
      if (response.message === 'success') {

        //나중에 삭제 인증번호 콘솔창 로그
        console.log("인증번호 : ", response.code)

        setCertificationValidation('valid');
        setCertificationAlert("인증 번호가 발송되었습니다.")
        setCertificationInputDisabled(false) // false값으로 바꿈 이건 인풋상자
      } else {
        sweetalert.error('인증번호 발송에 실패했습니다. 나중에 다시 시도해주세요.', '', '확인');
      }
    } catch (error) {
      console.error('인증번호 요청 중 오류 발생:', error);
      sweetalert.warning('오류가 발생했습니다. 나중에 다시 시도해주세요.');
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
      setNicknameVaildColor("")
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
      setNicknameVaildColor("is-valid")
    } else if (data.message === "duplicated") {
      setNicknameAlert("이미 사용중.");
      setNicknameValidation('invalid');
      setNicknameVaildColor("is-invalid")
    }
  };


  const comparePassword = () => {
    if (passwordRef1.current.value === passwordRef2.current.value) {
      setPasswordAlert2("비밀번호가 일치합니다.")
      setPasswordSame(true)

      setPasswordValidColor("is-valid")

    } else {
      setPasswordAlert2("비밀번호가 일치하지 않습니다.")

      setPasswordSame(false)
    }
   
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
      setPasswordValidColor("is-invalid")
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
      sweetalert.warning('이메일 중복체크 요망')
      emailRef.current.focus()
      return
    }
    if (certificationValidation === 'invalid') {
      sweetalert.warning('이메일 인증 요망')
      return
    }
    if (nicknameValidation === 'invalid') {
      sweetalert.warning('닉네임 중복체크 요망')
      nicknameRef.current.focus()
      return
    }

    if (passwordValidation === 'invalid') {
      sweetalert.warning('올바르지 않은 비밀번호 형식')
      passwordRef1.current.focus()
      return
    }


    if (!passwordSame) {
      sweetalert.warning("비밀번호가 일치하지 않습니다.")
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




  const mbtiDescriptions = {
    ENFP: 'ENFP는 열정적이고 창의적이며, 사람들과의 상호작용을 즐기는 성격입니다.',
    ENTJ: 'ENTJ는 리더십이 강하고, 목표 지향적인 성격입니다.', 
    ENTP: 'ENTP는 혁신적이고 논리적인 사고를 즐기는 성격입니다.', 
    ESFJ: 'ESFJ는 사교적이고 타인에게 도움을 주는 것을 좋아하는 성격입니다.', 
    ESFP: 'ESFP는 활기차고 즐거움을 추구하는 성격입니다.', 
    ESTJ: 'ESTJ는 실용적이고 조직적인 성격입니다.', 
    ESTP: 'ESTP는 모험적이고 문제 해결을 즐기는 성격입니다.', 
    ENFJ: "ENFJ는 멋지고 잘생겼고 아름다운 성격입니다.",
    INFJ: 'INFJ는 직관적이고 이상주의적인 성격입니다.', 
    INFP: 'INFP는 감성적이고 이상을 추구하는 성격입니다.', 
    INTJ: 'INTJ는 전략적이고 계획적인 성격입니다.', 
    INTP: 'INTP는 논리적이고 분석적인 성격입니다.', 
    ISFJ: 'ISFJ는 신뢰할 수 있고 헌신적인 성격입니다.', 
    ISFP: 'ISFP는 예술적이고 유연한 성격입니다.', 
    ISTJ: 'ISTJ는 신뢰할 수 있고 책임감 있는 성격입니다.', 
    ISTP: 'ISTP는 실용적이고 모험을 즐기는 성격입니다.' ,
    미정 : '천천히 생각해보세요! 저희 사이트는 MBTI성격검사도 할수있습니다!'
    
};

  const handleMBTIChange = (e) => {
    const value = e.target.value;
    if (value !== '') {
      setMbtiDescription(mbtiDescriptions[value]);
      setShowModal2(true);
    }
  };

  




  return (

    <div className="container mt-5 c1">
      <div className={styles.logoBox}>
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className={styles.logo} />
      </Link>
      </div>
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
                  <input type="email" className={`form-control ${emailValidation === 'valid' ? emailValidColor : emailValidColor} `} name="email" id="email" placeholder="E-mail" ref={emailRef} onBlur={handleEmailOnBlur} required />
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
                  <input type="text" className={`form-control ${nicknameValidation === 'valid' ? nicknameVailidColor : nicknameVailidColor} `} name="nickname" id="nickname" placeholder="nickname" maxLength={16} onBlur={handleNickNameOnBlur} ref={nicknameRef} required />
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
                  className={`form-control ${passwordValidation === 'valid' ? 'is-valid' : 'invalid'}`}
                  name="password"
                  id="user-pw"
                  placeholder="Password"
                  required

                  onInput={handlePasswordOnInput}
                  ref={passwordRef1}
                />
                <div className={`text-${passwordValidation === 'valid' ? 'success' : 'danger'}`}>{passwordAlert}</div>

                <label htmlFor="user-pw" className="form-label">비밀번호 재확인</label>
                <input type="password" className={`form-control ${passwordValidation === 'valid' ? passwordValidColor : 'hidden'} $`} name="repassword" id="user-pw" placeholder="password" ref={passwordRef2} onInput={handlePasswordOnInput2} />
                <div className={`text-${passwordSame === true ? 'success' : 'danger'}`}>{passwordAlert2}</div>
              </div>

              <div className="d-flex gap-2">
                <select className="form-control" name="mbti" id="user-mbti" required onChange={handleMBTIChange}>
                  <option value="">MBTI를 선택해주세요.</option>
                  <option value ="INTJ" >INTJ</option>
                  <option value="INTP">INTP</option>
                  <option value="ENTJ">ENTJ</option>
                  <option value="ENTP">ENTP</option>
                  <option value="INFJ">INFJ</option>
                  <option value="INFP">INFP</option>
                  <option value="ENFJ">ENFJ</option>
                  <option value="ENFP">ENFP</option>
                  <option value="ISTJ">ISTJ</option>
                  <option value="ISFJ">ISFJ</option>
                  <option value="ESTJ">ESTJ</option>
                  <option value="ESFJ">ESFJ</option>
                  <option value="ISTP">ISTP</option>
                  <option value="ISFP">ISFP</option>
                  <option value="ESTP">ESTP</option>
                  <option value="ESFP">ESFP</option>
                  <option value="미정">미정 - 아직 잘 모르겠습니다.</option>
                </select>
              </div>
              <div className="col-12">
                <p className={styles.mbtiCheck}><a href="#" onClick={() => setShowModal1(true)}><strong >[클릭]</strong><strong style={{ color: "#0866ff" }}> MBTI</strong>란 무엇인가요? </a></p>
                <div className="form-check">

                <input className="form-check-input" type="checkbox" id="checkBox1" required  />

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
      {/* 질문창 모달임 */}
      <Modal show={showModal1} onHide={() => setShowModal1(false)}>
        <Modal.Header closeButton >
          <Modal.Title className={styles.modalTitle}>MBTI란 무엇인가요?!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>INFP - 이상주의적이며 창의적. 감성적이고 예술적인 장점을 가짐.</li> <li>ENFJ - 자연스러운 지도자, 타인의 성장을 도움. 따뜻하고 카리스마 있는 성격.</li> <li>INTJ - 전략적 사고와 계획을 중시. 독립적이며 복잡한 문제 해결에 뛰어남.</li> <li>ENTP - 혁신적이고 창의적. 새로운 아이디어 탐구와 토론을 즐김.</li> <li>ISFJ - 책임감 있고 신뢰할 수 있음. 타인을 돌보는 데 뛰어난 장점을 가짐.</li> <li>ESTP - 에너지가 넘치고 모험적. 실용적이며 즉각적인 결과를 선호함.</li> <li>INFJ - 직관적이고 통찰력이 있음. 감정 이해에 뛰어나며 사회 정의에 열정적임.</li> <li>ESFP - 사교적이고 즐거움을 추구. 에너지 넘치고 순간을 즐기는 데 장점이 있음.</li> <li>INTP - 분석적이고 논리적인 사고. 복잡한 이론 탐구를 즐기며 독립적으로 일하는 것을 선호함.</li> <li>ESFJ - 사교적이고 배려심이 깊음. 커뮤니티에서 중요한 역할을 하며 전통과 규칙을 중시함.</li> <li>ISTJ - 신뢰할 수 있고 책임감이 강함. 조직적이고 세부 사항에 주의를 기울임.</li> <li>ENTJ - 전략적 사고를 중시하는 자연스러운 리더. 목표 달성을 위해 체계적으로 접근함.</li> <li>ISFP - 부드럽고 예술적. 자신의 감정과 경험을 소중히 여기며 타인에 대한 배려심이 깊음.</li> <li>ESTJ - 실용적이고 조직적. 규칙과 절차를 중시하며 효율성을 강조함.</li> <li>ISTP - 분석적이고 실용적. 문제 해결 능력이 뛰어나며 독립적으로 일하는 것을 선호함.</li> <li>ENFP - 열정적이고 창의적. 새로운 아이디어와 가능성을 탐구하는 데 장점이 있음.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.modalbtn1} variant="secondary">
            <a href='https://www.kmbti.co.kr/' style={{ color: 'inherit', textDecoration: 'none' }}>
              Check! MBTI
            </a>
          </Button>
          <Button className={styles.modalbtn2}variant="secondary" onClick={() => setShowModal1(false)}>네. 알겠습니다.</Button>

        </Modal.Footer>
      </Modal>
      
    {/*너의 mbti설명임. */}
      <Modal show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton >
          <Modal.Title className={styles.modalTitle}>당신의 MBTI는?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {mbtiDescription}
        </Modal.Body>
        <Modal.Footer> 
          <Button className={styles.modalbtn2}variant="secondary" onClick={() => setShowModal2(false)}>네. 이해했습니다.</Button>
        </Modal.Footer>
      </Modal>
    </div>




  );
}

export default Join;