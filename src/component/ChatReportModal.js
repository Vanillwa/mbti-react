import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import styles from "../css/postView.module.css";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { reportChatRoom } from "../service/api/reportAPI";
import sweetalert from "./sweetalert";
import { useNavigate } from "react-router-dom";
import { PiSirenFill } from "react-icons/pi";
import { socket } from "../service/socket/socket";
function ChatReportModal({ roomId }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [reportType, setReportType] = useState(0);
  const [modalRoomId, setModalRoomId] = useState(true);
  const [modalUserNickName, setModalUserNickName] = useState(true);

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //신고유형
  const handleReportTypeChange = selectedType => {
    setReportType(selectedType);
  };

  const handleReportOnChange = e => {
    switch (e.target.value) {
      case "신고유형":
        setReportType(0);
        break;
      case "사기":
        setReportType(1);
        break;
      case "도배":
        setReportType(2);
        break;
      case "개인정보노출":
        setReportType(3);
        break;
      case "영리/홍보":
        setReportType(4);
        break;
      case "음란성/선정성":
        setReportType(5);
        break;
    }
  };

  const handleReport = async () => {
    let body = {
      roomId,
      type: reportType,
    };
    if (reportType == 0) {
      sweetalert.warning("신고 유형을 선택해주세요.", "", "확인");
      return;
    }
    const result = await reportChatRoom(body);

    if (result.message === "success") {
      sweetalert.success("신고가 완료되었습니다.", "", "확인");
      navigate("/chat");
    } else if (result.message === "duplicated") {
      sweetalert.warning("이미 신고한 글입니다.", "", "확인");
    }
    setShow(false);
  };

  return (
    <>
      <>
        {isLoggedIn ? (
          <>
            <div
              className={styles.ReportBtn}
              type="button"
              variant="info"
              onClick={handleShow}>
              <PiSirenFill style={{fontSize:'24px'}} />
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>신고하기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Label>신고자</Form.Label>
                    <Form.Control
                      value={userInfo?.nickname}
                      autoFocus
                      disabled={modalUserNickName}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>신고 채팅방번호</Form.Label>
                    <Form.Control value={roomId} disabled={modalRoomId} />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Dropdown>
                      <select onChange={handleReportOnChange}>
                        <option value="신고 유형">신고유형</option>
                        <option
                          value="사기"
                          onClick={() => handleReportTypeChange("사기")}>
                          사기
                        </option>
                        <option
                          value="도배"
                          onClick={() => handleReportTypeChange("도배")}>
                          도배
                        </option>
                        <option
                          value="개인정보노출"
                          onClick={() =>
                            handleReportTypeChange("개인정보노출")
                          }>
                          개인정보노출
                        </option>
                        <option
                          value="영리/홍보"
                          onClick={() => handleReportTypeChange("영리/홍보")}>
                          영리/홍보
                        </option>
                        <option
                          value="음란성/선정성"
                          onClick={() =>
                            handleReportTypeChange("음란성/선정성")
                          }>
                          음란성/선정성
                        </option>
                      </select>
                    </Dropdown>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Form.Label>신고시 해당 유저가 차단됩니다.</Form.Label>
                <Button type="submit" variant="primary" onClick={handleReport}>
                  신고하기
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  취소
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : null}
      </>
    </>
  );
}

export default ChatReportModal;
