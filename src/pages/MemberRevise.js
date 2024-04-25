import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link } from "react-router-dom";
// import img from "../images/MBTI.png";
// 프로필 수정삭제 구현하기 위해 만듬
import Modal from 'react-bootstrap/Modal';
// 프로필 수정아이콘 클릭시 선팝업창 뜨게 만들려고 씀
import Button from 'react-bootstrap/Button'


// import { checkDuplicationNickname } from '../service/api';


// 로그인 상태정보를 불러옴
import { useAuthContext } from "../context/AuthContext";
import { userCheckDuplicationNickname } from '../service/api';
import { userNickNameChanged } from '../service/api';
import { userUpdateNickname } from '../service/api';






function MemberRevise() {
  // 유저데이타 받아옴
  const { memoUserInfo, login, logout } = useAuthContext();
  const { userInfo, isLoggedIn } = memoUserInfo;

  console.log(userInfo)
  console.log(isLoggedIn)





  // 닉네임 

  const nicknameRef = useRef();
  const [nicknameAlert, setNicknameAlert] = useState('')
  const [nicknameValidation, setNicknameValidation] = useState()
  const [nicknameEditable, setNicknameEditable] = useState(false);
  const [nicknameBtn, setNicknameBtn] = useState('수정')


  // 패스워드
  const [pw, setpw] = useState('')
  const [newPwname, setNewpwname] = useState("")
  const [pwEditable, setPwEditable] = useState(false)
  const [pwButtonChange, setPwButtonChange] = useState(false)
  const [passwordBtn, setPasswordBtn] = useState('수정')


  const [pwAlert,setPwAlert ] = useState('')


  // mbti
  const [mbti, setMbti] = useState(userInfo.mbti)
  const [newMbti, setNewMbti] = useState()
  const [mbtiChange, setMbtiChange] = useState()


  // 불러온 사진 업로드 
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');


  // 프로필란에 수정 및 사진변경 기능을 추가하기 위한 코드
  // 프로필 사진 변경 모달을 위한 상태
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


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
      }
    }
  }

  // 패스워드 변경 
  const handlepwChange = (e) => {
    setNewpwname(e.target.value)
  }


  

  const handlePasswordBtnOnclick = async () => {
    if (passwordBtn == '수정') {
      setPwEditable(true)
      setPasswordBtn('체크')
      setPwAlert("비밀번호를 한번 더 입력해주세요.")
      return
    }
      else if(pwEditable && pwAlert  ){
        

      }

    if (passwordBtn == '체크') {
      setpw(newPwname)
      setPwEditable(false)
      setPwButtonChange(false)
      alert("비밀번호가 변경되었습니다.");

    }

  }






  // mbti변경
  const handleMbtichange = (e) => {
    const selectedMbti = e.target.value;
    setNewMbti(selectedMbti);
    mbtiChangeHandler(selectedMbti);
  };

  const mbtiChangeHandler = (selectedMbti) => {
    if (selectedMbti) {
      setMbti(selectedMbti);
      alert("MBTI가 변경되었습니다.");
      userInfo.mbti = selectedMbti;
    }
  };







  // 이미지 파일 
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };




  // 팝업 제어 함수
  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  // 모달 제어 함수
  const handleShowModal = () => {
    setShowPopup(false);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const Popup = () => (
    <div style={{ position: 'absolute', top: '5%', left: '20%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', zIndex: 100, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h5>프로필 사진 변경</h5>
      <Button variant="primary" onClick={handleShowModal}>이미지 변경</Button>
      <Button variant="secondary" onClick={handleClosePopup} style={{ marginLeft: '10px' }}>닫기</Button>
    </div>
  );



  // 업로드 사진
  const handleSave = async () => {
    if (!selectedFile) {
      return;
    }
    console.log(handleSave)

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('업로드 성공');
        // 업로드 성공 후 필요한 로직 추가
      } else {
        console.log('업로드 실패');
        // 실패 처리 로직 추가
      }
    } catch (error) {
      console.error('업로드 중 에러 발생', error);
      // 에러 처리 로직 추가
    }
  };

  const handleSubmit = async (e) => {

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
              <img src={preview} alt="회원사진" className="user-image" />
              <div onClick={handleShowPopup} style={{ cursor: "pointer" }}>✏</div>
              {showPopup && <Popup />}
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>프로필 편집</h2>
            </div>
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
                  <input type="password" className="form-control" name="password" id="user-pw" placeholder="password" disabled={!pwEditable} onInput={handlepwChange} />
                  <button
                    type='button'                  
                    onClick={handlePasswordBtnOnclick}
                  >      
                  {passwordBtn}            
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="user-pw" className="form-label">MBTI</label>
                <div className="d-flex gap-2">
                  <select className="form-control" name="mbti" id="user-mbti" onChange={handleMbtichange} >
                    <option value="">MBTI 재선택</option>
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
                  </select>
                </div>
                <div className='button' style={{ paddingTop: '10px' }}>
                  <button type="submit" className="btn btn-primary me-2">확인</button>
                  <button type="button" className="btn btn-secondary">취소</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>사진 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file' className='form-control' onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleCloseModal}>
            닫기
          </button>
          <button className='btn btn-primary' onClick={handleCloseModal} type='button'>저장</button>
        </Modal.Footer>
      </Modal>

    </div>


  );
}



export default MemberRevise;