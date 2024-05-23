import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../css/ReportList.module.css";
import chatRoomStyles from "../css/ChatRoom.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { socket } from "../service/socket/socket";
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
  setType,
}) {
  const queryClient = new QueryClient();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [user, setUser] = useState({ nickname: "" });
  const blockRef = useRef();
  const [report, setReport] = useState();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);

  console.log("chatRoom", chatRoomData);
  const completePostMutate = useMutation(reportId => {
    return updatePostReport(reportId);
  });

  const completeCommentMutate = useMutation(reportId => {
    return updateCommentReport(reportId);
  });

  const completeChatRoomMutate = useMutation((reportId, targetId, roomId) => {
    return updateChatRoomReport(reportId, targetId, roomId);
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

  const handleChatRoomComplete = async (reportId, targetId, roomId) => {
    completeChatRoomMutate.mutate((reportId, targetId, roomId), {
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
      sweetalert.success("정지 완료");
      socket.emit("blockUser", report.Post.User.userId);
      completePostMutate.mutate(report.reportId, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(["getPostReportList"]);
          await postRefetch();
          return;
        },
      });

      setShow(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };

  //댓글 신고처리
  const handleCommentSubmit = async e => {
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      userId: user.userId,
      commentId: report.Comment?.commentId,
      blockDate,
    });

    if (result.message === "success") {
      sweetalert.success("정지 완료");
      socket.emit("blockUser", report.Comment.User.userId);
      completeCommentMutate.mutate(report.reportId, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(["getCommentReportList"]);
          await commentRefetch();
          return;
        },
      });
      setShow1(false);
    } else if (result.message === "fail") {
      sweetalert.warning("정지 실패");
    }
  };
  //채팅 신고처리
  const handleChatRoomSubmit = async e => {
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      userId: user.userId,
      roomId: report.roomId,
      blockDate,
    });
    if (result.message === "success") {
      socket.emit("blockUser", report.targetUser.userId);
      sweetalert.success("정지 완료");
      completeChatRoomMutate.mutate(
        report.reportId,
        report.targetUser.userId,
        report.roomId,
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["getChatRoomReportList"]);
            await chatRefetch();
            return;
          },
        }
      );
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
      {/* 게시글 신고모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handlePostSubmit}>
            <span className="me-2"> </span>
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
          <form
            className={styles.blockModalForm}
            onSubmit={handleCommentSubmit}>
            <span className="me-2"></span>
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
          <Button variant="primary" onClick={handleClose1}>
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
          <form
            className={styles.blockModalForm}
            onSubmit={handleChatRoomSubmit}>
            <span className="me-2">닉네임:{user.nickname} </span>
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
            onClick={() =>
              handleChatRoomComplete(
                report.reportId,
                report.targetUser.userId,
                report.roomId
              )
            }>
            처리완료
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion>
        {type === "post" && postData.list.length > 0 ? (
          postData.list.map(item => {
            return (
              <Accordion.Item
                className={styles.Accordion}
                eventKey={item.reportId}
                key={item.reportId}>
                <Accordion.Header>
                  <div className="container">
                    <div className={`  ${styles.reportContent}`}>
                      <span className={` ${styles.reportId}`}>
                        글번호:{item.Post?.postId}
                      </span>
                      <span className={`  ${styles.reportWriter}`}>
                        작성자:{item.Post?.User.nickname}
                      </span>
                      <span className={` ${styles.reportPerson}`}>
                        신고자:{item.User?.nickname}
                      </span>
                      <span className={`${styles.reportType}`}>
                        신고유형:{item.type}
                      </span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className={styles.postTitle}>{item.Post?.title}</div>
                  <div className={styles.postContent}>
                    <ContentComponent content={item.Post?.content} />
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
        ) : type === "comment" && commentData.list.length > 0 ? (
          commentData.list.map(item => {
            return (
              <Accordion.Item
                className={styles.Accordion}
                eventKey={item.reportId}
                key={item.reportId}>
                <Accordion.Header>
                  <div className="container">
                    <div className={`  ${styles.reportContent}`}>
                      <span className={` ${styles.reportId}`}>
                        글번호:{item.Comment.commentId}
                      </span>
                      <span className={` ${styles.reportWriter}`}>
                        작성자:{item.Comment.User.nickname}
                      </span>
                      <span className={` ${styles.reportPerson}`}>
                        신고자:{item.User.nickname}
                      </span>
                      <span className={` ${styles.reportType}`}>
                        신고유형:{item.type}
                      </span>
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
                    onClick={() =>
                      handleCommentReport(item.Comment.User, item)
                    }>
                    처리
                  </button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        ) : type === "chat" && chatRoomData.list.length > 0 ? (
          chatRoomData.list.map(item => {
            console.log(item);
            return (
              <Accordion.Item
                className={styles.Accordion}
                eventKey={item.reportId}
                key={item.reportId}>
                <Accordion.Header>
                  <div className="container">
                    <div className={`  ${styles.reportContent}`}>
                      <span className={` ${styles.reportId}`}>
                        방번호:{item.roomId}
                      </span>
                      <span className={` ${styles.reportId}`}>
                        신고자:{item.reportUser.nickname}
                      </span>
                      <span className={` ${styles.reportPerson}`}>
                        피신고자:{item.targetUser.nickname}
                      </span>
                      <span className={`${styles.reportType}`}>
                        신고유형:{item.type}
                      </span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles.AccordionBody}>
                  <section className={chatRoomStyles.section}>
                    <div className={chatRoomStyles.chatForm}>
                      <div className={chatRoomStyles.chatFormInner}>
                        {item.chat.length === 0 ? (
                          <div className={chatRoomStyles.alert}>
                            아직 채팅이 없습니다.
                          </div>
                        ) : (
                          item.chat.map((message, i) => {
                            if (message.userId === item.reportUser.userId) {
                              return (
                                <div
                                  key={message.messageId}
                                  className={`${chatRoomStyles.chat} ${chatRoomStyles.mine}`}>
                                  <div >
                                    <div  className={chatRoomStyles.yourNickname}>{message.nickname}</div>

                                    <div className={chatRoomStyles.content}>
                                      {message.message}
                                    </div>
                                  </div>
                                  <div className={chatRoomStyles.profileBox}>
                                    <img
                                    className={chatRoomStyles.userImg}
                                      src={message.profileImage}
                                      alt="profile"></img>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={message.messageId}
                                  className={`${chatRoomStyles.chat}`}>
                                  <div className={chatRoomStyles.profileBox}>
                                    <img
                                      className={chatRoomStyles.userImg}
                                      src={message.profileImage}
                                      alt="profile"
                                    />
                                  </div>
                                  <div className={chatRoomStyles.right}>
                                    <div
                                      className={chatRoomStyles.yourNickname}>
                                      {message.nickname}
                                    </div>
                                    <div className={chatRoomStyles.yourContent}>
                                      {message.message}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })
                        )}
                      </div>
                    </div>
                  </section>
                  {/* <div className={styles.postContent}>
                    <ContentComponent content={item.Post.content} />
                  </div> */}

                  <button
                    className={styles.reportBtn}
                    type="button"
                    onClick={() => handleChatReport(item.targetUser, item)}>
                    처리
                  </button>
                </Accordion.Body>
              </Accordion.Item>
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
