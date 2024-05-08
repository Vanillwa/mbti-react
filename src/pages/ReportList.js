import React, { useRef, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import {
  getPostReportList,
  suspendUser,
  updatePostReport,
} from "../service/api";
import styles from "../css/ReportList.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import ViewContent from "../component/ViewContent";

function ReportList() {
  const queryClient = new QueryClient();
  const [show, setShow] = useState(false);
  const [report, setReport] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const blockRef = useRef();

  const handleReport = report => {
    setReport(report);
    setShow(true);
  };

  const completeMutate = useMutation(reportId =>{
    return  updatePostReport(reportId);
  })
  const handleComplete = async (reportId) => {
   completeMutate.mutate(reportId,{
    onSuccess:async()=>{
    await queryClient.invalidateQueries(["getPostReportList"]);
    await refetch();
    return;
    },
   })
    setShow(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser(
      report.Post.postId,
      report.Post.User.userId,
      blockDate
    );
    alert("정지 완료");
  };

  const { data, status,refetch } = useQuery(
    ["getPostReportList"],
    () => getPostReportList(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

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
  console.log(data);

  if (data.length == 0) {
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handleSubmit}>
          {report?.Post.User.nickname}
            <select ref={blockRef}>
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={7}>7일</option>
            </select>
            <button className={styles.blockModalBtn} type="submit">정지</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="secondary" onClick={()=>handleComplete(report.reportId)}>
            처리완료
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className={styles.title}>신고목록</h2>
      <div className={styles.reportBox}>
        <div className={styles.reportList}>
          <Accordion>
            {data.map(item => {
              return (
                <Accordion.Item eventKey={item.reportId} >
                  <Accordion.Header>
                    
                    <div className= {styles.reportListBox}>
                      <div className={styles.reportContent}>
                        <span className={styles.reportId}>
                          글번호:{item.Post.postId}
                        </span>
                        <span className={styles.reportId}>
                          작성자:{item.Post.User.nickname}
                        </span>
                        <span className={styles.reportPerson}>
                          신고자:{item.User.nickname}
                        </span>
                        <span>신고유형:{item.type}</span>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className={styles.postTitle}>{item.Post.title}</div>
                    <div className={styles.postContent}><ContentComponent content={item.Post.content} /></div>
                    
                    <button className={styles.reportBtn} type="button" onClick={() => handleReport(item)}>
                      처리
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default ReportList;
