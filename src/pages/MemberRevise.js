import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../images/areyout.png';
import { Link, useNavigate } from "react-router-dom";
// import img from "../images/MBTI.png";
// 프로필 수정삭제 구현하기 위해 만듬
import Modal from 'react-bootstrap/Modal';
// 프로필 수정아이콘 클릭시 선팝업창 뜨게 만들려고 씀
import Button from 'react-bootstrap/Button'
import '../css/MemberRevise.css'
import Swal from "sweetalert2"
import sweetalert from "../component/sweetalert";
import Footer from '../component/Footer';

// import { checkDuplicationNickname } from '../service/api';


// 로그인 상태정보를 불러옴
import { useAuthContext } from "../context/AuthContext";
import { userCheckDuplicationNickname } from "../service/api/memberReviseAPI";
import { userUpdateNickname } from "../service/api/memberReviseAPI";
import { userUpdatePassword } from "../service/api/memberReviseAPI";
import { userUpdateMbti } from "../service/api/memberReviseAPI";
import { userDeleteImage } from "../service/api/memberReviseAPI";
import axios from 'axios';






function MemberRevise() {
  // 유저데이타 받아옴
  const { memoUserInfo, login, logout } = useAuthContext();
  const { userInfo, isLoggedIn } = memoUserInfo;




  const navigate = useNavigate()




  const [imgUrl, setImgUrl] = useState(userInfo.profileImage)
  // 닉네임 

  const nicknameRef = useRef();
  const [nicknameAlert, setNicknameAlert] = useState('')
  const [nicknameValidation, setNicknameValidation] = useState()
  const [nicknameEditable, setNicknameEditable] = useState(false);
  const [nicknameBtn, setNicknameBtn] = useState('수정')


  // 패스워드
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const [pwMessage, setPwmessage] = useState('')
  const [pwEditable, setPwEditable] = useState(false)
  const [passwordBtn, setPasswordBtn] = useState('수정')
  // const [password,setPassword] = useState("")
  
 





  // mbti
  const mbtiRef = useRef()
  const [mbti, setMbti] = useState(userInfo.mbti)


  // 이미지 
  const imageRef = useRef();



  // 인풋타입 file대체 하기 위해 
  const handleButtonOnClick = () => {
    imageRef.current.click()
  }




  // 이미지 수정
  const imageHandler = async () => {
    console.log('온체인지');
    const file = imageRef.current.files[0];
    // multer에 맞는 형식으로 데이터 만들어준다.
    const formData = new FormData();
    formData.append('img', file); // formData는 키-밸류 구조
    // 백엔드 multer라우터에 이미지를 보낸다.
    try {
      const result = await axios.put('https://192.168.5.17:10000/api/updateUserInfo/updateProfileImage', formData);
      console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);

      setImgUrl(result.data.url)
      logout()
      login(result.data.newUserInfo)


      imageRef.current.value = null
    } catch (error) {
      console.log('실패했어요ㅠ');
    }

  };

  // 이미지 삭제 
  const imageDeleteHandler = async () => {
    const result = await userDeleteImage()
    setImgUrl(result.url)
    console.log(result.url)
    logout()
    login(result.newUserInfo)

  }






  // 닉네임 중복 
  const handleCheckDuplicationNickname = async () => {
    let nickname = nicknameRef.current.value;
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/;

    // 정규식을 사용하여 닉네임 유효성 검사
    if (!nicknameRegex.test(nickname)) {
      setNicknameAlert("닉네임은 영문자, 숫자, 한글을 포함하여 2글자 이상 16글자 이하로 입력해주세요.");
      setNicknameValidation("invalid");
      return;
    }

    // 닉네임 중복 검사
    const data = await userCheckDuplicationNickname({ nickname });
    return data;

  };

  const handleNicknameBtnOnclick = async () => {

    if (nicknameBtn == '수정') {
      setNicknameEditable(true)
      setNicknameBtn('체크')

      return
    }
    if (nicknameBtn == '체크') {
      const result = await handleCheckDuplicationNickname()
      console.log(result)
      if (result?.message === "success") {
        setNicknameAlert("사용 가능한 닉네임 입니다.");
        setNicknameValidation('valid');
        setNicknameBtn('변경')
      } else if (result?.message === "duplicated") {
        setNicknameAlert("이미 사용중.");
        setNicknameValidation('invalid');
      }
    }






    if (nicknameBtn == '변경') {

      const result = await userUpdateNickname({ nickname: nicknameRef.current.value })

      if (result?.message === 'success') {
        sweetalert.success('닉네임 변경 완료', '', '확인')
        setNicknameEditable(false)
        setNicknameAlert("");
        setNicknameBtn("수정")
        logout()
        login(result.newUserInfo)
      } else {
        console.log('nickname change failed:', result.message);
      }
    }
  }






  const handlePasswordBtnOnclick = async () => {

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_.-]{6,20}$/;
    if (passwordBtn == '수정') {
      setPwEditable(true)
      setPasswordBtn('확인')
      return
    }
    if (passwordBtn == '확인') {

      if (!passwordRegex.test(passwordRef1.current.value)) {
        setPwmessage("비밀번호는 숫자와 영문자를 포함하여 6자 이상 20자 이하로 입력해주세요.");
        return
      } else if (passwordRef2.current.value != passwordRef1.current.value) {
        setPwmessage("비밀번호가 일치하지 않습니다")
        return
      }
      setPwmessage("비밀번호가 일치합니다.")

      setPasswordBtn('변경')
    }


    if (passwordBtn == '변경') {

      const result = await userUpdatePassword({ password: passwordRef1.current.value })
      if (result.message === 'success') {
        sweetalert.success('비밀번호 변경 완료', '', '확인')
        passwordRef1.current.value = ''
        passwordRef2.current.value = ''
        setPwEditable(false)
        setPwmessage("")
        setPasswordBtn("수정")
       
       
       
        
        return
      }
    }


  }

  const handlePasswordChange = (e) => {
    setPasswordBtn('확인');
    setPwmessage("")
    return
  };







  // mbti변경
  const handleMbtiChange = async () => {
    const result = await userUpdateMbti({ mbti: mbtiRef.current.value });
    if (result.message === 'success') {


      sweetalert.success('MBTI 변경 완료', 'MBTI가 성공적으로 변경되었습니다.', '확인')
      // 크롬 브라우저 세선 스토러지에서 로그인정보를 지웠다가 로그인 다시 하면 새로운 정보값을 채워줌.
      logout()
      login(result.newUserInfo)
    } else {
      sweetalert.success('MBTI 변경 실패', 'MBTI 변경에 실패하셨습니다.', '확인')
    }
  };


  console.log(passwordBtn)
  console.log(passwordRef1)
  console.log(mbtiRef)


 




  return (
   
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div className="card">
        <div className="card-body">
          <form >
            <div className="text-center mb-5">
              <img src={imgUrl} alt="회원사진" className="user-image" />


              <h2 className="fw-bold" style={{ fontSize: '40px', color: "#0866ff" }}>프로필 편집</h2>
            </div>
            <div className='buttonWrap'>

            <input type="file" hidden="hidden" onChange={imageHandler} ref={imageRef} />
              <button type="button" id="custom-button" className='buttonsim' onClick={handleButtonOnClick}><strong>파일 선택</strong></button>


              <button type='button' onClick={imageDeleteHandler} className='buttonjun'><strong>삭제</strong></button>
            </div>

            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control form-control-email emailinput" name="email" id="email" placeholder={userInfo.email} disabled />
                </div>
              </div>

              <div>
                <label htmlFor="user-pw" className="form-label">닉네임 변경</label>
                <div className='d-flex gap-2 '>
                  <input type="text" className="form-control" defaultValue={userInfo.nickname} disabled={!nicknameEditable} ref={nicknameRef} />
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={handleNicknameBtnOnclick}
                  >
                    {nicknameBtn}
                  </button>

                </div>
                {nicknameAlert && (
                  <div style={{ color: nicknameValidation === 'valid' ? 'green' : 'red' }}>
                    {nicknameAlert}
                  </div>
                )}
              </div>


              <div>
                <label htmlFor="user-pw" className="form-label">비밀번호 변경</label>
                <div className="d-flex gap-2">
                  <input type="password" className="form-control passwordBtn1" name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef1} onChange={handlePasswordChange}  />
                  <button
                    className='btn btn-sm btn-primary'
                    type='button'
                    onClick={handlePasswordBtnOnclick}
                  >
                    {passwordBtn}
                  </button>
                </div>
                <input type="password" className={`form-control passwordBtn2  ${passwordBtn == '수정' ? 'hidden' : ''}`} name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef2} onChange={handlePasswordChange} v/>
                <p style={{ color: pwMessage === "비밀번호가 일치하지 않습니다" ? "red" : "green" }}>{pwMessage}</p>
              </div>

              <div>
                <label htmlFor="user-pw" className="form-label">MBTI</label>
                <div className="d-flex gap-2">
                  <select
                    className="form-control"
                    name="mbti"
                    id="user-mbti"
                    onChange={handleMbtiChange}
                    ref={mbtiRef}
                  >
                    <option value="">{userInfo.mbti}</option>
                    <option value="">MBTI 없음</option>
                    <option value="INTJ">INTJ</option>
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
                  </select>
                </div>
                <div className='buttondong d-flex gap-2' style={{ paddingTop: '10px' }}>

                  <button
                    type="button"
                    className='btn btn-sm btn-primary'
                    onClick={() => navigate('/post/list')}
                  >게시판으로 이동</button>
                  <button type='button' className='btn btn-sm btn-primary' onClick={() => navigate('/userdelete')}>회원탈퇴</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
<Footer></Footer>
    </div>
   

  );
}



export default MemberRevise