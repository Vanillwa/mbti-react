import React, { useEffect, useRef, useState } from "react";
import styles from "../css/postView.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ClickPostLikes,
  PostReport,
  getPostView,
  postDelete,
} from "../service/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
function ViewContent() {
  const [likes, setLikes] = useState("checked");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reportType, setReportType] = useState(0);

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
  console.log(reportType);
  const handleReport = async () => {
    let body = {
      postId,
    type:reportType,
    };
    if(reportType ==0){
      alert("신고 유형을 선택해주세요.")
      return;
    }
    console.log(body);
    const result = await PostReport(body);
    alert("신고가 완료되었습니다.")
    setShow(false)
  };

  /**좌우스크롤 먼저 실행되게 하는 함수*/
  const contentRef = useRef(null);

  useEffect(() => {
    const handleWheel = e => {
      if (e.deltaY != 0) {
        e.preventDefault();
        contentRef.current.scrollLeft += e.deltaY + e.deltaX;
      }
    };
    let contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("wheel", handleWheel);
      }
    };
  });

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const { data, status } = useQuery(
    ["getPostView", postId],
    () => getPostView(postId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  let img = userInfo?.profileImage;
  if (img == null && !isLoggedIn) {
    img = notImg;
  }
  const goEdit = () => {
    navigate(`/post/edit?postId=${data.postId}`);
  };

  const handleDelete = async () => {
    try {
      alert("정말 삭제하시겠습니까?");
      await postDelete(postId);
      alert("삭제 완료");
      navigate("/post/list");
    } catch (error) {
      console.error("삭제중 오류", error);
      alert("삭제 실패");
    }
  };

  const handleLikeClick = async () => {
    const result = await ClickPostLikes(data.postId);
    if (result.message == "success") {
      console.log("좋아요 눌렀음.");
    } else if (result.message == "duplicated") {
    }
    console.log(result.message);
  };

  function ContentComponent({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }

  if (status === "loading") {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="container">
        <h1>error!</h1>
      </div>
    );
  }

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  const differenceInHours = Math.floor((now - createdAt) / 1000 / 60 / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  let dateDisplay;
  if (differenceInHours < 24) {
    dateDisplay = `${differenceInHours}시간 전`;
  } else if (differenceInDays <= 7) {
    dateDisplay = `${differenceInDays}일 전`;
  } else {
    dateDisplay = createdAt.toLocaleDateString("ko-KR");
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mbti}>
          <span>{data.category} 게시판</span>
          {userInfo?.userId == data.User.userId && isLoggedIn ? (
            <div className="d-flex">
              <div className={styles.editBtn} type="button" onClick={goEdit}>
                수정
              </div>
              <div
                onClick={handleDelete}
                className={styles.delBtn}
                type="button">
                삭제
              </div>
            </div>
          ) : null}
          <Button variant="info" onClick={handleShow}>
            신고하기
          </Button>

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
                    value={userInfo.nickname}
                    autoFocus
                    disabled="true"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>신고 게시글번호</Form.Label>
                  <Form.Control value={postId} disabled="true" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>신고유형</Form.Label>
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
                        onClick={() => handleReportTypeChange("개인정보노출")}>
                        개인정보노출
                      </option>
                      <option
                        value="영리/홍보"
                        onClick={() => handleReportTypeChange("영리/홍보")}>
                        영리/홍보
                      </option>
                      <option
                        value="음란성/선정성"
                        onClick={() => handleReportTypeChange("음란성/선정성")}>
                        음란성/선정성
                      </option>
                    </select>
                  </Dropdown>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleReport}>
                신고하기
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className={styles.editBox}></div>
        <div className={styles.header}>
          <div className={styles.nickname}>
            <img
              className={styles.userImg}
              src={data.User.profileImage ? data.User.profileImg : notImg}
            />
            {data.User.nickname}
          </div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.date}>{dateDisplay}</div>
        </div>
        <div className={styles.main}>
          <div className={styles.content} ref={contentRef}>
            <ContentComponent content={data.content} />
          </div>
          <div className={styles.likesBox}>
            <div
              type="button"
              className={styles[likes]}
              onClick={handleLikeClick}>
              좋아요❤
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewContent;
