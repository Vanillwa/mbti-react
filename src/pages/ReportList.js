import React, { useState } from "react";
import { useQuery } from "react-query";

import Form from "react-bootstrap/Form";
import {
  getCommentReportList,
  getPostReportList

} from "../service/api/reportAPI";
import styles from "../css/ReportList.module.css";

import ReportItems from "../component/ReportItems";

function ReportList() {

 
  const [type, setType] = useState("post");
 

  // const handleCommentReport = report=>{
  //   setReport(report);
  //   setShow(true)
  // }

  const handleRadioOnChange = e => {
    setType(e.target.value);
  };

  const {
    data: postData,
    status: postStatus,
    refetch: postRefetch,
  } = useQuery(["getPostReportList"], () => getPostReportList(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: commentData,
    status: commentStatus,
    refetch: commentRefetch,
  } = useQuery(["getCommentReportList"], () => getCommentReportList(), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Form onChange={handleRadioOnChange}>
        <div className="mb-3 radio">
          <Form.Check
            inline
            label="게시글 신고"
            value="post"
            name="group1"
            type="radio"
            checked={type === "post"}
          />
          <Form.Check
            inline
            label="댓글 신고"
            value="comment"
            name="group1"
            type="radio"
            checked={type === "comment"}
          />
          <Form.Check
            inline
            label="채팅 신고"
            value="chat"
            name="group1"
            type="radio"
            checked={type === "chat"}
          />
        </div>
      </Form>

      <h2 className={styles.title}>신고목록</h2>
      <div className={styles.reportBox}>
        <div className={styles.reportList}>
          <ReportItems
            postData={postData}
            postStatus={postStatus}
            type={type}
            setType={setType}
            commentData={commentData}
            commentStatus={commentStatus}
            postRefetch={postRefetch}
          />
        </div>
      </div>
    </>
  );
}

export default ReportList;
