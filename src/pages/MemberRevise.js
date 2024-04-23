import React, { useState,useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.avif';
import { Link } from "react-router-dom";
// import img from "../images/MBTI.png";
// 프로필 수정삭제 구현하기 위해 만듬
import Modal from 'react-bootstrap/Modal';
// 프로필 수정아이콘 클릭시 선팝업창 뜨게 만들려고 씀
import Button from 'react-bootstrap/Button'


// 로그인 상태를 불러옴
import { loginStatus } from '../service/api';






function MemberRevise() {
  // 닉네임버튼 초기값 지정
  const [nicknameEditable, setNicknameEditable] = useState(false); 
   // 닉네임버튼 클릭 시 버튼 모양 변경하기 위함
   const [nicknameButtonChange,setNicknameButtonChange] = useState(false)

  // 이벤트 발생 시  setNicknameEditable 값 변역
  const nicknameChangeHandler = () => {  
    setNicknameEditable(!nicknameEditable);
    setNicknameButtonChange(!nicknameButtonChange)
   
  };

 // 변경성공 메세지를 위해
 const prevNicknameButtonChange = useRef(nicknameButtonChange);

 
  useEffect(() => {
    // 페이지 로딩 시에는 실행되지 않고, 실제로 닉네임 버튼 상태가 변경될 때만 "변경성공" 알림 표시
    if (prevNicknameButtonChange.current !== nicknameButtonChange) {
      alert("변경성공");
    }
    // 현재 상태를 이전 상태로 업데이트
    prevNicknameButtonChange.current = nicknameButtonChange;
  }, [nicknameButtonChange]);



  // 닉네임 변경 버튼 누를 시 닉네임값 변경
  





  


  
  // 비밀번호버튼 초기값 지정
  const [pwEditable,setPwEditable] = useState(false)
  // 닉네임 버튼 클릭 시 모양변경
  const [pwButtonChange,setPwButtonChange] = useState(false)

  const pwChangeHandler =() => {
    setPwEditable (!pwEditable)
    setPwButtonChange(!pwButtonChange)
   
  }



 const handleNicknameChange = (e) => {
    setCurrentNickname(e.target.value);
  };

  const[currenNickname,setCurrentNickname]=useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { nickname } = await loginStatus(); // API 호출을 통해 닉네임 정보 가져오기
        setCurrentNickname(nickname); // 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUser();
  }, []); // 빈 배열을 넣어 컴포넌트 마운트 시에만 호출되도록 함





  // 불러온 사진 업로드 
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');


  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // 파일을 읽어 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


 /* 이건 뤼튼 사용  */
  // 프로필란에 수정 및 사진변경 기능을 추가하기 위한 코드
  const [showPopup, setShowPopup] = useState(false);
  // 프로필 사진 변경 모달을 위한 상태
  const [showModal, setShowModal] = useState(false);

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
    <div style={{position: 'absolute', top: '5%', left: '20%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', zIndex: 100, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <h5>프로필 사진 변경</h5>
      <Button variant="primary" onClick={handleShowModal}>이미지 변경</Button>
      <Button variant="secondary" onClick={handleClosePopup} style={{marginLeft: '10px'}}>닫기</Button>
    </div>
  );

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





  return (
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div className="card">
        <div className="card-body">
          <form>
          <div className="text-center mb-5">
              <img src={preview} alt="회원사진" className="user-image" />
             <div onClick={handleShowPopup} style={{cursor: "pointer"}}>✏</div> 
                {showPopup && <Popup />}
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>프로필 편집</h2>            
            </div>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="email" className="form-label">이메일</label>
                <div className='d-flex gap-2'>
                  <input type="text" className="form-control form-control-email" name="email" id="email" placeholder="E-mail" disabled/>
                </div>
              </div>
              
              <div>
              <label htmlFor="user-pw" className="form-label">닉네임 변경</label>
                <div className='d-flex gap-2 '>                
                  <input type="text" className="form-control" placeholder={`${currenNickname}`} disabled={!nicknameEditable}  onChange={handleNicknameChange}/>
                  <button
                    type='button'
                    className={`btn btn-sm ${nicknameButtonChange ? 'btn-success' : 'btn-danger'}`}
                    onClick={nicknameChangeHandler}
                  >
                    {nicknameButtonChange ? '변경' : '수정'}
                  </button>
                </div>                                
              </div>


              <div>
              <label htmlFor="user-pw" className="form-label">비밀번호 변경</label>
              <div className="d-flex gap-2">               
                <input type="password" className="form-control" name="password" id="user-pw" placeholder="Password" disabled= {!pwEditable} />
                <button
                    type='button'
                    className={`btn btn-sm ${pwButtonChange ? 'btn-success' : 'btn-danger'}`}
                    onClick={pwChangeHandler}
                  >
                    {pwButtonChange ? '변경' : '수정'}
                  </button>
                </div>
              </div>
            
              <div>
              <label htmlFor="user-pw" className="form-label">MBTI</label>
              <div className="d-flex gap-2">
                    <select className="form-control" name="mbti" id="user-mbti" >
                      <option value="">MBTI 선택</option>
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