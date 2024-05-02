import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, redirect, useNavigate } from "react-router-dom";
import logo from '../images/areyout.png';
import '../css/UserDelete.css'
import { useAuthContext } from "../context/AuthContext";
import { deletePasswordCheck } from '../service/api';
import { deleteUser } from '../service/api';





function UserDelete() {
     const navigate = useNavigate()


    const { memoUserInfo, login, logout } = useAuthContext();
    const { userInfo, isLoggedIn } = memoUserInfo;
    
   console.log(userInfo)



// 비밀번호
    const [passwordBtn,setPasswordBtn] =useState("수정")
    const [pwEditable, setPwEditable] = useState(false)


    const [pwMessage, setPwmessage] = useState('')
    const passwordRef = useRef();
  

    const handlePasswordBtnOnclick = async () => {
      const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_.-]{6,20}$/;
    
      if (passwordBtn === '수정') {
        setPwEditable(true);
        setPasswordBtn('확인');
        return;
      }
    
      if (passwordBtn === '확인') {
        const result = await deletePasswordCheck({password:passwordRef.current.value})
        console.log(result)
        if (result.message ==="success") {
          
         
          setPwEditable(true);
          setPwmessage("비밀번호 검증이 완료되었습니다.");
          setPasswordBtn('완료');
        } else if(result.message === "fail"){
          
          setPwmessage("비밀번호가 틀렸습니다.")        
        }
        return;
      }
    };

    const handleDeleteOnclick = async () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
      }

    
      try {
        const result = await deleteUser();
        if (result.message === "success") {
          alert("회원탈퇴가 성공했습니다.");
          logout();
          navigate("/");
        } else if (result.message === "fail") {
          setPwmessage("회원탈퇴에 실패하셨습니다.");
        } else {
          setPwmessage("알 수 없는 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setPwmessage("회원탈퇴에 실패하셨습니다.");
      }
    };




    



    return (
      <div className="container mt-5">
        <a href="/" className="navbar-logo d-flex justify-content-center">
      
          <img src={logo} alt="로고" className="logo" />
        </a>
        <div className="card">
          <div className="card-body">
            <div className="text-center mb-5">
            
              <h2 className="fw-bold" style={{ fontSize: '40px', color:"#0866ff"}}>회원탈퇴</h2>
            </div>
       
            <p >그 동안 AreYouT를 사랑해주셔서 감사합니다. 하단에는 삭제하는 기능과 해당 사유란이 있으니 설정 부탁드리겠습니다.  </p>
            <div className="row g-3">
              <div className="col-12">
                <div className='d-flex gap-2'>
                <label htmlFor="email" className="form-label mt-3">계정을 삭제하려는 이유가 뭔가요?</label>
                </div>
                <div className='d-flex gap-2'>
                <select className="form-control" id="user-mbti">
                <option value="">삭제사유</option>
                    <option value="">이 사이트가 재미가없습니다.</option>
                    <option value="">더 좋은 사이트를 찾았습니다.</option>
                    <option value="">현질유도가 심합니다.</option>
                    <option value="">욕설하는 유저가 너무 많습니다.</option>
                    <option value="">기타.</option>
                  
                  </select>
                </div>
              </div>
  
              <div>
                <label htmlFor="user-pw" className="form-label">비밀번호를 입력해주세요.</label>
                <div className="d-flex gap-2">
                  <input type="password" className="form-control" id="user-pw" placeholder="password" disabled={!pwEditable}  ref={passwordRef}/>
                  <button type ='button'className='btn btn-sm btn-primary' onClick={handlePasswordBtnOnclick}>{passwordBtn}</button>
                </div>
                <p style={{ color: pwMessage === "비밀번호가 틀렸습니다." ? "red" : "green"}}>{pwMessage}</p>
              </div>
              <div>
          
              <h5 style={{color:"#0866ff"}} className='mb-3'>회원탈퇴를 신청하기전에, 내용을 꼭확인해주세요. </h5>
              <li>고객정보 및 개인형 서비스 이용 기록은 정보보호처리 기준에따라 삭제됩니다.</li>
              <li>회원탈퇴 시 보유하시던 적립금은 회원정보에 등록된 계좌로 자동이체 됩니다.</li>
              <li>회원탈퇴 시 더이상 AreYouT 서비스를 이용불가능 합니다.</li>          
              </div>


              <div>
                <label htmlFor="user-mbti" className="form-label mt-5">계속하시면 회원님의 회원정보가 <strong style={{color:"red"}}>삭제</strong>됩니다. <strong>삭제</strong>를 원하시면 하단의 회원정보 탈퇴 버튼을 눌러주세요.</label>
                <div className="d-flex gap-2">
                </div>
                <div className='col-12 d-flex justify-content-center'>
                <div className='button' style={{ paddingTop: '10px' }}>
                  <button type="btn btn-secondary" className="btn btn-primary me-2"disabled={!pwEditable} onClick={handleDeleteOnclick}>회원탈퇴</button>                 
                </div>
                <div className='button' style={{ paddingTop: '10px' }}>
                  <button type="button" className="btn btn-secondary"onClick={() => navigate('/memberevise')}>뒤로가기</button>
                 
                </div>
               
                </div>
              </div>
            </div>
          </div>  
        </div>
      
      </div>
    );
  }

  export default UserDelete;