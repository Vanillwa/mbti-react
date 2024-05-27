import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/areyout.png';
import styles from '../css/UserDelete.module.css';
import { useAuthContext } from "../context/AuthContext";
import { deleteUser, deletePasswordCheck } from "../service/api/memberReviseAPI";
import Swal from "sweetalert2";
import sweetalert from "../component/sweetalert";
import Footer from "../component/Footer";
import { Modal, Button } from 'react-bootstrap';

function UserDelete() {
  const navigate = useNavigate();

  const { memoUserInfo, logout } = useAuthContext();
  const { userInfo } = memoUserInfo;

  console.log(userInfo);

  // 비밀번호
  const [passwordBtn, setPasswordBtn] = useState("확인");
  const [pwEditable, setPwEditable] = useState(true);
  const [pwMessage, setPwmessage] = useState('');
  const [passwordValidColor, setPasswordValidColor] = useState('');
  const passwordRef = useRef();

  // 삭제 이유
  const [deleteReason, setDeleteReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  // 그 모달 더보기창 약관때매 만듬
  const [showModal, setShowModal] = useState(false);

  const handlePasswordBtnOnclick = async () => {
    if (passwordBtn === '확인') {
      const result = await deletePasswordCheck({ password: passwordRef.current.value });

      console.log(result);
      if (result.message === "success") {
        setPwEditable(true);
        setPwmessage("비밀번호 검증이 완료되었습니다.");

        setPasswordBtn('완료');
        setPasswordValidColor('is-valid');
      } else if (result.message === "fail") {
        setPwmessage("비밀번호가 틀렸습니다.");
        setPasswordValidColor('is-invalid');
      }
    }
  };

  const handleDeleteOnclick = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "이 작업이 끝나면 영구적으로 회원정보가 삭제됩니다.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#6c757d",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "네 삭제 하겠습니다.",
      cancelButtonText: "아니요 다시 한번 생각해보겠습니다."
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteUser();
          if (result.message === "success") {
            sweetalert.success('탈퇴 완료', '탈퇴되셨습니다.', '확인');
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
      }
    });
  };

  const handleReasonChange = (event) => {
    setDeleteReason(event.target.value);
    if (event.target.value !== "기타") {
      setOtherReason('');
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/" className="navbar-logo d-flex justify-content-center">
        <img src={logo} alt="로고" className={styles.logo} />
      </Link>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ fontSize: '45px', color: "#0866ff" }}>회원탈퇴</h2>
          </div>
          <p>그 동안 <strong style={{ color: "#0866ff" }}>R U T ?</strong>를 사랑해주셔서 감사합니다. 하단에는 삭제하는 기능과 해당 사유란이 있으니 설정 부탁드리겠습니다.</p>
          <form onSubmit={handleDeleteOnclick}>

            <div className="row g-3">
              <div className="col-12">
                <div className='d-flex gap-2'>
                  <label htmlFor="delete-reason" className="form-label mt-3">계정을 삭제하려는 이유가 뭔가요?</label>
                </div>
                <div className='d-flex gap-2'>
                  <select className={styles.input1} id="delete-reason" value={deleteReason} onChange={handleReasonChange} required>
                    <option value="">삭제사유</option>
                    <option value="재미없음">이 사이트가 재미가없습니다.</option>
                    <option value="더 좋은 사이트 발견">더 좋은 사이트를 찾았습니다.</option>
                    <option value="현질유도">현질유도가 심합니다.</option>
                    <option value="욕설하는 유저 많음">욕설하는 유저가 너무 많습니다.</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                {deleteReason === "기타" && (
                  <div className={`mt-3 ${styles.reason}`}>
                    <label htmlFor="other-reason" className="form-label">기타 사유:</label>
                    <input
                      type="text"
                      className={`form-control ${styles.reasonBox}`}
                      id="other-reason"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="user-pw" className="form-label">비밀번호를 입력해주세요.</label>
                <div className="d-flex gap-2">
                  <input type="password" className={`form-control ${passwordValidColor}`} id="user-pw" placeholder="password" disabled={!pwEditable} ref={passwordRef} required />
                  <button type='button' className='btn btn-sm btn-primary' onClick={handlePasswordBtnOnclick}>{passwordBtn}</button>
                </div>

                <p style={{ color: pwMessage === "비밀번호가 틀렸습니다." ? "red" : "green" }}>{pwMessage}</p>
              </div>

              <div>
                <h5 style={{ color: "red" }} className='mb-3'>회원탈퇴를 신청하기전에, 내용을 꼭 확인해주세요. </h5>

                <li>고객정보 및 개인형 서비스 이용 기록은 정보보호처리 기준에따라 삭제됩니다.</li>
                <li>회원탈퇴 시 보유하시던 적립금은 회원정보에 등록된 계좌로 자동이체 됩니다.</li>
                <li>회원탈퇴 시 더이상 <strong style={{ color: "#0866ff" }}>R U T ?</strong>서비스를 이용불가능 합니다.</li>

                <p><strong><a href="#" onClick={() => setShowModal(true)}>더 보기...</a></strong></p>
              </div>

              <div>
                <label htmlFor="user-mbti" className="form-label mt-5">
                  계속하시면 회원님의 회원정보가 <strong style={{ color: "red" }}>삭제</strong>됩니다.
                  <strong>삭제</strong>를 원하시면 하단의 회원정보 탈퇴 버튼을 눌러주세요.
                </label>
                <div className="d-flex gap-2">
                </div>
                <div className='col-12 d-flex justify-content-center'>
                  <div className='button' style={{ paddingTop: '10px' }}>
                    <button type="submit" className="btn btn-primary me-2" disabled={!pwEditable}>회원탈퇴</button>
                  </div>
                  <div className='button' style={{ paddingTop: '10px' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/memberevise')}>뒤로가기</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />

   
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>추가 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>고객정보 및 개인형 서비스 이용 기록은 정보보호처리 기준에 따라 삭제됩니다.</li>
            <li>회원탈퇴 시 보유하시던 적립금은 회원정보에 등록된 계좌로 자동이체 됩니다.</li>
            <li>회원탈퇴 시 더 이상 <strong style={{ color: "#0866ff" }}>R U T ?</strong> 서비스를 이용 불가능합니다.</li>
            <li>회원 탈퇴 후 재가입 시 혜택을 다시 받을 수 없습니다.</li>
            <li>기타 궁금한 사항이 있으시면 고객센터로 문의해 주세요.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>네 항목에 대하여 확인하였습니다!ㅎㅎ.</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDelete;
