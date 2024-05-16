import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/ReportList.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  suspendUser,
  updateChatRoomReport,
  updateCommentReport,
  updatePostReport,
} from "../service/api/reportAPI";
import sweetalert from "./sweetalert";
import { QueryClient, useMutation } from "react-query";
function ReportItems({
  postData,
  postStatus,
  postRefetch,
  commentData,
  commentStatus,
  commentRefetch,
  chatRoomData,
  chatRoomStatus,
  chatRefetch,
  type,
  setType
}) {
  const queryClient = new QueryClient();
  const [show, setShow] = useState(false);
  const [show1,setShow1] = useState(false);
  const [show2,setShow2] = useState(false);
  const [user, setUser] = useState({ nickname: "" });
  const blockRef = useRef();
  const [report, setReport] = useState();
  const handleClose = () => setShow(false);
  const handleClose1 = ()=>setShow1(false);
  const handleClose2 = ()=>setShow2(false);



  const completePostMutate = useMutation(reportId => {
    return updatePostReport(reportId);
  });

  const completeCommentMutate = useMutation(reportId => {
    return updateCommentReport(reportId);
  });

  const completeChatRoomMutate = useMutation(reportId => {
    return updateChatRoomReport(reportId);
  });



  const handlePostComplete = async reportId => {
    completePostMutate.mutate(reportId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getPostReportList"]);
        await postRefetch();
        return;
      },
    });
    setShow(false);
  };

  const handleCommentComplete = async reportId => {
    completeCommentMutate.mutate(reportId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getCommentReportList"]);
        await commentRefetch();
        return;
      },
    });
    setShow(false);
  };

  const handleChatRoomComplete = async reportId => {
    completeChatRoomMutate.mutate(reportId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getChatRoomReportList"]);
        await chatRefetch();
        return;
      },
    });
    setShow(false);
  };


  //게시글 신고처리
  const handlePostSubmit = async e => {
    console.log(report);
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      postId: report.Post?.postId,
      userId: user.userId,
      blockDate,
    });
    if (result.message === "success") {
      console.log("report:", report);
      sweetalert.success("정지 완료");
      completePostMutate(report.reportId);
      setShow(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };

  //댓글 신고처리
  const handleCommentSubmit = async e => {
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
      console.log("report:", report);
      sweetalert.success("정지 완료");
      completeCommentMutate(report.reportId);
      setShow1(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };
  //채팅 신고처리
  const handleChatRoomSubmit = async e => {
    console.log(report);
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      postId: report.Post?.postId,
      userId: user.userId,
      chatRoomId: report.ChatRoom?.roomId,
      blockDate,
    });
    if (result.message === "success") {
      console.log("report:", report);
      sweetalert.success("정지 완료");
      completeChatRoomMutate(report.reportId);
      setShow2(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };

  const handlePostReport = (userData, reportData) => {
    setUser(userData);
    setReport(reportData);
    setShow(true);
  };
  const handleCommentReport = (userData, reportData) => {
    setUser(userData);
    setReport(reportData);
    setShow1(true);
  };
  const handleChatReport = (userData, reportData) => {
    setUser(userData);
    setReport(reportData);
    setShow2(true);
  };

  function ContentComponent({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }

  if (
    postStatus === "loading" ||
    commentStatus === "loading" ||
    chatRoomStatus === "loading"
  ) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (
    postStatus === "error" ||
    commentStatus === "error" ||
    chatRoomStatus === "error"
  ) {
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
          <form className={styles.blockModalForm} onSubmit={handlePostSubmit}>
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
            onClick={() => handlePostComplete(report.reportId)}>
            처리완료
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
{/* 댓글신고모달 */}
<Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handleCommentSubmit}>
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
            onClick={() => handleCommentComplete(report.reportId)}>
            처리완료
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


{/* 채팅신고모달 */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handleChatRoomSubmit}>
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
            onClick={() => handleChatRoomComplete(report.reportId)}>
            처리완료
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion>
        {type === "post" && postData.length > 0 ? (
          postData.map(item => {
            return (
              <Accordion.Item eventKey={item.reportId}>
                <Accordion.Header>
                  <div className="container">
                    <div className={`row  ${styles.reportContent}`}>
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
        ) : type === "comment" && commentData.length > 0 ? (
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
                    <div className={styles.commentContent}>
                      <ContentComponent content={item.Comment.content} />
                    </div>

                    <button
                      className={styles.reportBtn}
                      type="button"
                      onClick={() => handleCommentReport(item.Comment.User, item)}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            );
          })
        ) : type === "chat" && chatRoomData.length > 0 ? (
          chatRoomData.map(item => {
            {
              console.log(item.ChatRoom);
            }
            return (
              <>
                <Accordion.Item eventKey={item.reportId}>
                  <Accordion.Header>
                    <div className="container">
                      <div className={`row   ${styles.reportContent}`}>
                        <span className={`col-3 ${styles.reportId}`}>
                          방번호:{item.ChatRoom.roomId}
                        </span>
                        <span className={`col-3  ${styles.reportId}`}>
                          피신고자:{item.ChatRoom.user2.nickname}
                        </span>
                        <span className={`col-3 ${styles.reportPerson}`}>
                          신고자:{item.User.nickname}
                        </span>
                        <span className={`col-3`}>신고유형:{item.type}</span>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={styles.postContent}>
                      <span>채팅 내용</span>
                      <ContentComponent content={item.ChatRoom.roomId} />
                    </div>

                    <button
                      className={styles.reportBtn}
                      type="button"
                      onClick={() => {
                        item.ChatRoom.user1.userId === item.User.userId
                          ? handleChatReport(item.ChatRoom.user2, item)
                          : handleChatReport(item.ChatRoom.user1, item);
                      }}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            );
          })
        ) : (
          <div>작성된 신고가 없습니다.</div>
        )}
      </Accordion>
    </>
  );
}

export default ReportItems;