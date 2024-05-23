import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'cropperjs/dist/cropper.css';
import { Cropper } from 'react-cropper';
import logo from '../images/areyout.png';
import { Link, useNavigate } from "react-router-dom";
import  styles  from '../css/MemberRevise.module.css';
import sweetalert from "../component/sweetalert";
import Footer from '../component/Footer';
import { useAuthContext } from "../context/AuthContext";
import { userCheckDuplicationNickname, userUpdateNickname, userUpdatePassword, userUpdateMbti, userDeleteImage } from "../service/api/memberReviseAPI";
import axios from 'axios';

function MemberRevise() {
  const { memoUserInfo, login, logout } = useAuthContext();
  const { userInfo } = memoUserInfo;

  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(userInfo.profileImage);
  const [cropper, setCropper] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef();
  
  // 같은 사진 누를시 안나오는거 해결하기 위한
  const [prevImage,setPrevImage] =useState();

  const [nicknameAlert, setNicknameAlert] = useState('');
  const [nicknameValidation, setNicknameValidation] = useState();
  const [nicknameEditable, setNicknameEditable] = useState(false);
  const [nicknameBtn, setNicknameBtn] = useState('수정');

  const [nicknameValidColor,setNicknameValidColor] =useState('')

  const nicknameRef = useRef();

  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const [pwMessage, setPwmessage] = useState('');
  const [pwEditable, setPwEditable] = useState(false);
  const [passwordBtn, setPasswordBtn] = useState('수정');
  const [passwordValidColor,setPasswordValidColor] =useState('')

  const mbtiRef = useRef();

  const handleButtonOnClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppedImage(reader.result);
        setPrevImage(croppedImage)
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const handleCrop = async (e) => {
    e.preventDefault();  // Prevent form submission

    if (cropper) {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('img', blob);
        try {
          const result = await axios.put('https://192.168.5.17:10000/api/updateUserInfo/updateProfileImage', formData);
          setImgUrl(result.data.url);
          sweetalert.success('사진 변경 완료', '', '확인');
          logout();
          login(result.data.newUserInfo);
          imageRef.current.value = null;
          setCroppedImage(null); // 크롭 창을 닫기 위해 크롭 이미지를 초기화
        } catch (error) {
          console.log('Image upload failed', error);
          sweetalert.error('이미지 업로드 실패', '이미지 업로드 중 문제가 발생했습니다. 다시 시도해 주세요.', '확인');
        }
      }, 'image/png');
    }
  };

  const cancel = () => {
    setCroppedImage(prevImage);
   
  };

  const imageDeleteHandler = async () => {
    try {
      const result = await userDeleteImage();
      setImgUrl(result.url);
      logout();
      login(result.newUserInfo);
    } catch (error) {
      console.log('Image delete failed', error);
      sweetalert.error('이미지 삭제 실패', '이미지 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.', '확인');
    }
  };

  const handleCheckDuplicationNickname = async () => {
    let nickname = nicknameRef.current.value;
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/;

    if (!nicknameRegex.test(nickname)) {
      setNicknameAlert("닉네임은 영문자, 숫자, 한글을 포함하여 2글자 이상 16글자 이하로 입력해주세요.");
      setNicknameValidation("invalid");
      return;
    }

    const data = await userCheckDuplicationNickname({ nickname });
    return data;
  };

  const handleNicknameBtnOnclick = async () => {
    if (nicknameBtn === '수정') {
      setNicknameEditable(true);
      setNicknameBtn('체크');
      return;
    }

    if (nicknameBtn === '체크') {
      const result = await handleCheckDuplicationNickname();
      if (result?.message === "success") {
        setNicknameAlert("사용 가능한 닉네임 입니다.");
        setNicknameValidation('valid');
        setNicknameBtn('변경');
        setNicknameValidColor('is-valid')
      } else if (result?.message === "duplicated") {
        setNicknameAlert("이미 사용중.");
        setNicknameValidation('invalid');
        setNicknameValidColor("is-invalid")
      }
    }

    if (nicknameBtn === '변경') {
      const result = await userUpdateNickname({ nickname: nicknameRef.current.value });
      if (result?.message === 'success') {
        sweetalert.success('닉네임 변경 완료', '', '확인');
        setNicknameEditable(false);
        setNicknameAlert("");
        setNicknameBtn("수정");
        logout();
        login(result.newUserInfo);
      } else {
        console.log('nickname change failed:', result.message);
      }
    }
  };

  const handlePasswordBtnOnclick = async () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_.-]{6,20}$/;

    if (passwordBtn === '수정') {
      setPwEditable(true);
      setPasswordBtn('확인');
      return;
    }

    if (passwordBtn === '확인') {
      if (!passwordRegex.test(passwordRef1.current.value)) {
        setPwmessage("비밀번호는 숫자와 영문자를 포함하여 6자 이상 20자 이하로 입력해주세요.");
        setPasswordValidColor("is-invalid")
        return;
      } else if (passwordRef2.current.value !== passwordRef1.current.value) {
        setPwmessage("비밀번호가 일치하지 않습니다");
        setPasswordValidColor("is-invalid")
        return;
      }
      setPwmessage("비밀번호가 일치합니다.");
      setPasswordBtn('변경');
      setPasswordValidColor('is-valid')
    }

    if (passwordBtn === '변경') {
      const result = await userUpdatePassword({ password: passwordRef1.current.value });
      if (result.message === 'success') {
        sweetalert.success('비밀번호 변경 완료', '', '확인');
        passwordRef1.current.value = '';
        passwordRef2.current.value = '';
        setPwEditable(false);
        setPwmessage("");
        setPasswordBtn("수정");
      }
    }
  };

  const handlePasswordChange = () => {
    setPasswordBtn('확인');
    setPwmessage("");
  };

  const handleMbtiChange = async () => {
    const result = await userUpdateMbti({ mbti: mbtiRef.current.value });
    if (result.message === 'success') {
      sweetalert.success('MBTI 변경 완료', 'MBTI가 성공적으로 변경되었습니다.', '확인');
      logout();
      login(result.newUserInfo);
    } else {
      sweetalert.success('MBTI 변경 실패', 'MBTI 변경에 실패하셨습니다.', '확인');
    }
  };


  return (
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <form onSubmit={handleCrop}>
            <div className={styles.imageWrap}>
            <div className={`text-center mb-5 ${styles.imageBox}`}>
           
              <img src={imgUrl} alt="회원사진" className={styles.userImage} />
             
            </div>
            </div>
            <div className={styles.buttonWrap}>
              <input type="file" hidden="hidden" onChange={handleImageChange} ref={imageRef} />
              <button type="button" id="custom-button" className={styles.buttonsim} onClick={handleButtonOnClick}><strong>파일 선택</strong></button>
              <button type='button' onClick={imageDeleteHandler} className={styles.buttonjun}><strong>삭제</strong></button>
            </div>

            {croppedImage && (
  <div >
    <div className={`cropper-wrapper ${styles.cropperBox}`} >
    <Cropper
              style={{ height: 450, width: '100%' }}
              src={croppedImage}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              autoCropArea={0.8}  
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
                // 크롭박스 크기 설정하는곳
                instance.setCropBoxData({
                  width: 200,
                  height: 200,
                });
              }}
            />
    </div>
        <div className={styles.cropperboxbtn}>
    <button type="submit" className={`btn btn-primary mt-3 ${styles.uploadbtn1}`}>업로드</button>
    <button type="button" className={`btn btn-secondary mt-3 ml-2 ${styles.uploadbtn2}`} onClick={cancel}> 뒤로가기</button> 
  </div>
  </div>
)}
             
          </form>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="email" className="form-label">이메일</label>
              <div className='d-flex gap-2'>
                <input type="text" className={`form-control form-control-control-email ${styles.emailinput}`} name="email" id="email" placeholder={userInfo.email} disabled />
              </div>
            </div>

            <div>
              <label htmlFor="user-nickname" className="form-label">닉네임 변경</label>
              <div className='d-flex gap-2 '>
                <input type="text" className={`form-control ${nicknameValidation === 'valid' ? nicknameValidColor : nicknameValidColor} `} defaultValue={userInfo.nickname} disabled={!nicknameEditable} ref={nicknameRef} id="user-nickname" />
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
                <input type="password" className={`form-control ${styles.passwordBtn1}${passwordBtn === '확인' ? passwordValidColor : passwordValidColor} `} name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef1} onChange={handlePasswordChange} />
                <button
                  className='btn btn-sm btn-primary'
                  type='button'
                  onClick={handlePasswordBtnOnclick}
                >
                  {passwordBtn}
                </button>
              </div>
              <input type="password" className={`form-control ${styles.passwordBtn2} ${passwordBtn === '수정' ? 'hidden' : passwordValidColor}`} name="password" id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef2} onChange={handlePasswordChange} />
              <p style={{ color: pwMessage === "비밀번호가 일치하지 않습니다" || pwMessage === "비밀번호는 숫자와 영문자를 포함하여 6자 이상 20자 이하로 입력해주세요." ? "red" : "green" }}>{pwMessage}</p>
            </div>

            <div>
              <label htmlFor="user-mbti" className="form-label">MBTI</label>
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
              <div className={`${styles.buttondong} d-flex gap-2`} >
                <button
                  type="button"
                  className='btn btn-sm btn-primary'
                  onClick={() => navigate('/post/list')}
                >게시판으로 이동</button>
                <button type='button' className='btn btn-sm btn-primary' onClick={() => navigate('/userdelete')}>회원탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MemberRevise;
