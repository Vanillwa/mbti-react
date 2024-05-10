import React, { useRef, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  getCommentReportList,
  getPostReportList,
  suspendUser,
  updatePostReport,
} from "../service/api/reportAPI";
import styles from "../css/ReportList.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import ViewContent from "../component/ViewContent";
import sweetalert from "../component/sweetalert";

function ReportList() {
  const queryClient = new QueryClient();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({nickname:''});
  const [type,setType] = useState("post");
  const [report,setReport] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const blockRef = useRef();

  const handlePostReport = (userData,reportData) => {
    setUser(userData);
    setReport(reportData);
    setShow(true);
    
  };
  // const handleCommentReport = report=>{
  //   setReport(report);
  //   setShow(true)
  // }

  const completeMutate = useMutation(reportId => {
    return updatePostReport(reportId);
  });
  

const handleRadioOnchange = (e)=>{
  setType(e.target.value)


}

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
    console.log(report)
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
    postId: report.Post?.postId,
    userId: user.userId,
    commentId:report.Comment?.commentId,
    blockDate,
    
    }
    );
    if(result.message === "success"){
      sweetalert.success("정지 완료");
      handleComplete(report.reportId)
      setShow(false);
    }else if(result.message === "fail"){
      sweetalert.warning("정지 실패")
    }
    
  };

  const { data:postData, status:postStatus, refetch:postRefetch } = useQuery(
    ["getPostReportList"],
    () => getPostReportList(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
    const {data:commentData, status:commentStatus,refetch:commentRefetch} = useQuery(
      ["getCommentReportList"],
      ()=> getCommentReportList(),
      {
        retry: false,
        refetchOnWindowFocus: false,
      }
    )


  if (postStatus === "loading"|| commentStatus === "loading") {
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
 

  if (postData.length == 0 || commentData.length== 0) {
    return (
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    );
  }

  function ContentComponent({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  return (
    <>
      <Form onChange={handleRadioOnchange}>
        <div className="mb-3 radio">
          <Form.Check inline label="게시글 신고" value="post" name="group1" type="radio" checked={type ==="post"} />
          <Form.Check inline label="댓글 신고" value="comment" name="group1" type="radio" />
          <Form.Check inline label="채팅 신고" value="chat" name="group1" type="radio" />
        </div>
      </Form>


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

      <h2 className={styles.title}>신고목록</h2>


      <div className={styles.reportBox}>
        <div className={styles.reportList}>

          <Accordion>
            
            {type ==="post" ?        postData.map(item => {
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
                      onClick={() => handlePostReport(item.Post.User,item)}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              );
            }): type === "comment" ? commentData.map(item=>{
              
              return(
                <>
                {console.log(item)}
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
                      onClick={() => handlePostReport(item.Comment.User,item)}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                </>
              )
            }): <p>채팅방 신고 </p>}

            
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default ReportList;
