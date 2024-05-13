import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/ReportList.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { suspendUser, updatePostReport } from "../service/api/reportAPI";
import sweetalert from "./sweetalert";
import { QueryClient, useMutation } from "react-query";
function ReportItems({ postData, postStatus, commentData, commentStatus,type,setType ,postRefetch}) {
  const queryClient = new QueryClient();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({ nickname: "" });
  const blockRef = useRef();
  const [report, setReport] = useState();
  const handleClose = () => setShow(false);


  const completeMutate = useMutation(reportId => {
    return updatePostReport(reportId);
  });

  const handleComplete = async reportId => {
    completeMutate.mutate(reportId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getPostReportList"]);
        await postRefetch();
        return;
      },
    });
    setShow(false);
  };

  const handleSubmit = async e => {
    console.log(report);
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      postId: report.Post?.postId,
      userId: user.userId,
      commentId: report.Comment?.commentId,
      blockDate,
    });
    if (result.message === "success") {
      sweetalert.success("정지 완료");
      handleComplete(report.reportId);
      setShow(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };

  const handlePostReport = (userData, reportData) => {
    setUser(userData);
    setReport(reportData);
    setShow(true);
  };

  function ContentComponent({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  if (postStatus === "loading" || commentStatus === "loading") {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (postStatus === "error" || commentStatus === "error") {
    return (
      <div className="container">
        <h1>error!</h1>
      </div>
    );
  }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handleSubmit}>
            <span className="me-2">닉네임: {user.nickname}</span>
            <select className="me-3" ref={blockRef}>
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={7}>7일</option>
            </select>
            <button className={styles.blockModalBtn} type="submit">
              정지
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleComplete(report.reportId)}>
            처리완료
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Accordion>
     
        {type === "post" && postData.length >0  ? (
          postData.map(item => {
            return (
              <Accordion.Item eventKey={item.reportId}>
                <Accordion.Header>
                  <div className="container">
                    <div className={`row   ${styles.reportContent}`}>
                      <span className={`col-3 ${styles.reportId}`}>
                        글번호:{item.Post.postId}
                      </span>
                      <span className={`col-3  ${styles.reportId}`}>
                        작성자:{item.Post.User.nickname}
                      </span>
                      <span className={`col-3 ${styles.reportPerson}`}>
                        신고자:{item.User.nickname}
                      </span>
                      <span className={`col-3`}>신고유형:{item.type}</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className={styles.postTitle}>{item.Post.title}</div>
                  <div className={styles.postContent}>
                    <ContentComponent content={item.Post.content} />
                  </div>

                  <button
                    className={styles.reportBtn}
                    type="button"
                    onClick={() => handlePostReport(item.Post.User, item)}>
                    처리
                  </button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        ) : type === "comment" && commentData.length > 0 ?  (
          
          commentData.map(item => {
            
            return (
              <>
              
                <Accordion.Item eventKey={item.reportId}>
                  <Accordion.Header>
                    <div className="container">
                      <div className={`row   ${styles.reportContent}`}>
                        <span className={`col-3 ${styles.reportId}`}>
                          글번호:{item.Comment.commentId}
                        </span>
                        <span className={`col-3  ${styles.reportId}`}>
                          작성자:{item.Comment.User.nickname}
                        </span>
                        <span className={`col-3 ${styles.reportPerson}`}>
                          신고자:{item.User.nickname}
                        </span>
                        <span className={`col-3`}>신고유형:{item.type}</span>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={styles.postTitle}>{item.Comment.title}</div>
                    <div className={styles.postContent}>
                      <span>댓글 내용</span>
                      <ContentComponent content={item.Comment.content} />
                    </div>

                    <button
                      className={styles.reportBtn}
                      type="button"
                      onClick={() => handlePostReport(item.Comment.User, item)}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            );
          })
        ) : 
         type === "chat" ? (
          <p>채팅방 신고 </p>
        ) : (
          <div>작성된 신고가 없습니다.</div>
        )}
      </Accordion>
    </>
  );
}

export default ReportItems;
