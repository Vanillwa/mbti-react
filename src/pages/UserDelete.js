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

    const handleDeleteOnclick =async()=>{
      if(!window.confirm("정말 삭제하시겠습니까?")){
        return;
      }
      const result = await deleteUser()
      console.log(result.message)
      if(result.message==="success"){
        alert("회원탈퇴가 성공했습니다.")
        logout()
        navigate("/")
      }else if(result.message==="fail")
      setPwmessage("회원탈퇴에 실패하셨습니다.")
    } 




    



    return (
      <div className="container mt-5">
        <a href="/" className="navbar-logo d-flex justify-content-center">
      
          <img src={logo} alt="로고" className="logo" />
        </a>
        <div className="card">
          <div className="card-body">
            <div className="text-center mb-5">
            
              <h2 className="fw-bold" style={{ fontSize: '40px' }}>회원탈퇴</h2>
            </div>
            <p>그 동안 AreYouT를 사랑해주셔서 감사합니다. 하단에는 삭제하는 기능과 해당 사유란이 있으니 설정 부탁드리겠습니다.  </p>
            <div className="row g-3">
              <div className="col-12">
                <div className='d-flex gap-2'>
                <label htmlFor="email" className="form-label">계정을 삭제하려는 이유가 뭔가요?</label>
                </div>
                <div className='d-flex gap-2'>
                <select className="form-control" id="user-mbti">
                <option value="">삭제사유</option>
                    <option value="">이 사이트가 재미가없습니다.</option>
                    <option value="">더 좋은 사이트를 찾았습니다.</option>
                    <option value="">현질유도가 심합니다.</option>
                  </select>
                </div>
              </div>
  
              <div>
                <label htmlFor="user-pw" className="form-label">비밀번호를 입력해주세요.</label>
                <div className="d-flex gap-2">
                  <input type="password" className="form-control" id="user-pw" placeholder="password" disabled={!pwEditable}  ref={passwordRef}/>
                  <button type='button' onClick={handlePasswordBtnOnclick}>{passwordBtn}</button>
                </div>
                <p style={{ color: "green" }}>{pwMessage}</p>
              </div>
  
              <div>
                <label htmlFor="user-mbti" className="form-label">계속하시면 회원님의 회원정보가 삭제됩니다. 삭제를 원하시면 하단의 회원정보 탈퇴 버튼을 눌러주세요.</label>
                <div className="d-flex gap-2">
                </div>
                <div>
                <div className='button' style={{ paddingTop: '10px' }}>
                  <button type="btn btn-secondary" className="btn btn-secondary"disabled={!pwEditable} onClick={handleDeleteOnclick}>회원탈퇴</button>                 
                </div>
                <div className='button' style={{ paddingTop: '10px' }}>
                  <button type="button" className="btn btn-secondary">뒤로가기</button>
                 
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