import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link, useNavigate } from "react-router-dom";
// import img from "../images/MBTI.png";
// 프로필 수정삭제 구현하기 위해 만듬
import Modal from 'react-bootstrap/Modal';
// 프로필 수정아이콘 클릭시 선팝업창 뜨게 만들려고 씀
import Button from 'react-bootstrap/Button'
import '../css/MemberRevise.css'


// import { checkDuplicationNickname } from '../service/api';


// 로그인 상태정보를 불러옴
import { useAuthContext } from "../context/AuthContext";
import { userCheckDuplicationNickname } from '../service/api';
import { userUpdateNickname } from '../service/api';
import { userUpdatePassword } from '../service/api';
import { userUpdateMbti } from '../service/api';
import { userDeleteImage } from '../service/api';
import axios from 'axios';






function MemberRevise() {
  // 유저데이타 받아옴
  const { memoUserInfo, login, logout } = useAuthContext();
  const { userInfo, isLoggedIn } = memoUserInfo;

  console.log(userInfo)
  console.log(isLoggedIn)

  const navigate = useNavigate()




  const [imgUrl,setImgUrl] =useState(userInfo.profileImage)
  // 닉네임 

  const nicknameRef = useRef();
  const [nicknameAlert, setNicknameAlert] = useState('')
  const [nicknameValidation, setNicknameValidation] = useState()
  const [nicknameEditable, setNicknameEditable] = useState(false);
  const [nicknameBtn, setNicknameBtn] = useState('수정')


  // 패스워드
  const passwordRef = useRef();
  const [pwMessage, setPwmessage] = useState('')
  //const [newPwname, setNewpwname] = useState("")
  const [pwEditable, setPwEditable] = useState(false)
  //const [pwButtonChange, setPwButtonChange] = useState(false)
  const [passwordBtn, setPasswordBtn] = useState('수정')
  const [pwAlert, setPwAlert] = useState('')




  // mbti
  const mbtiRef = useRef()
  const [mbti, setMbti] = useState(userInfo.mbti)
  // const [newMbti, setNewMbti] = useState()
  // const [mbtiChange, setMbtiChange] = useState()


//  
 

  // 이미지 
  const imageRef = useRef();
  








  // 이미지 수정
  const imageHandler = async() => {
      console.log('온체인지');
      const file = imageRef.current.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append('img', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.put('https://192.168.5.17:10000/api/updateUserInfo/updateProfileImage', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
  
        setImgUrl (result.data.url)
        logout()
        login(result.data.newUserInfo)
        

        imageRef.current.value = null
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    
  };

  // 이미지 삭제 
   const imageDeleteHandler = async()=>{
    const result = await userDeleteImage() 
        setImgUrl(result.url) 
        logout()
        login(result.newUserInfo) 
        
      }
     
      

   


  // 닉네임 중복 
  const handleCheckDuplicationNickname = async () => {
    
    let nickname = nicknameRef.current.value
    if (!nickname || nickname.length < 2 || nickname.length > 20) {
      alert("최소 1글자 이상 10글자 이하로 입력해주세요.");
      setNicknameValidation("invalid");
      return;
    }
    const data = await userCheckDuplicationNickname({ nickname });
    return data

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
      if (result.message === "success") {
        setNicknameAlert("사용 가능한 닉네임 입니다.");
        setNicknameValidation('valid');
        setNicknameBtn('변경')
      } else if (result.message === "duplicated") {
        setNicknameAlert("이미 사용중.");
        setNicknameValidation('invalid');
      }
    }
    if (nicknameBtn == '변경') {
      const result = await userUpdateNickname({ nickname: nicknameRef.current.value })
      if (result.message === 'success') {
        alert('닉네임 변경 완료')
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
    if (passwordBtn == '수정') {
      setPwEditable(true)
      setPasswordBtn('확인')
      return
    }
    if (passwordBtn == '확인') {
      setPwEditable(true)
      setPwmessage("비밀번호를 한번더 입력해주세요.")
      setPasswordBtn('변경')
    }



    if (passwordBtn == '변경') {
      const result = await userUpdatePassword({ password: passwordRef.current.value })
      if (result.message === 'success') {
        alert(' 패스워드 변경 완료')
        setPwEditable(false)
        setPwAlert("");
        setPasswordBtn("수정")


      } else {
        console.log('Password change failed:', result.message);
      }
    }


  }






  // mbti변경
  const handleMbtiChange = async () => {
    const result = await userUpdateMbti({ mbti: mbtiRef.current.value });
    if (result.message === 'success') {
      alert("MBTI가 변경되었습니다.");
      // 크롬 브라우저 세선 스토러지에서 로그인정보를 지웠다가 로그인 다시 하면 새로운 정보값을 채워줌.
      logout()
      login(result.newUserInfo)
    } else {
      alert("MBTI 변경에 실패했습니다.");
    }
  };


  console.log(passwordBtn)
  console.log(passwordRef)
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
            
            
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>프로필 편집</h2>
            </div>
            <div>
              <input type="file" onChange={imageHandler} ref={imageRef}/>
            </div>
            <button type='button' onClick={imageDeleteHandler}>삭제</button>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control form-control-email" name="email" id="email" placeholder={userInfo.email} disabled />
                </div>
              </div>

              <div>
                <label htmlFor="user-pw" className="form-label">닉네임 변경</label>
                <div className='d-flex gap-2 '>
                  <input type="text" className="form-control" defaultValue={userInfo.nickname} disabled={!nicknameEditable} ref={nicknameRef} />
                  <button
                    type='button'
                    onClick={handleNicknameBtnOnclick} 
                  >
                    {nicknameBtn}
                  </button>

                </div>
                {nicknameAlert}
              </div>


              <div>
                <label htmlFor="user-pw" className="form-label">비밀번호 변경</label>
                <div className="d-flex gap-2">
                  <input type="password" className="form-control" name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef} />
                  <button
                    type='button'
                    onClick={handlePasswordBtnOnclick}
                  >
                    {passwordBtn}
                  </button>
                </div>
                <input type="password" className={`form-control ${passwordBtn == '수정' || passwordBtn == "확인" ? 'hidden' : ''}`} name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef} />
                <p style={{ color: "green" }}>{pwMessage}</p>
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
                    <option value="">MBTI 재선택</option>
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
                <div className='button' style={{ paddingTop: '10px' }}>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/post/list')}
                  >게시판으로 이동</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>


  );
}



export default MemberRevise;