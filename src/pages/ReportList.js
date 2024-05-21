import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Form from "react-bootstrap/Form";
import {
  getChatRoomReportList,
  getCommentReportList,
  getPostReportList,
} from "../service/api/reportAPI";
import styles from "../css/ReportList.module.css";

import ReportItems from "../component/ReportItems";
import Paging from "../component/Paging";

function ReportList() {
  const [type, setType] = useState("post");
  const [chatRoomMessageInfo, setChatRoomMessageInfo] = useState(null);
  const [page, setPage] = useState(1);
  // const handleCommentReport = report=>{
  //   setReport(report);
  //   setShow(true)
  // }

  const handleRadioOnChange = e => {
    setPage(1);
    setType(e.target.value);
  };

  const {
    data: postData,
    status: postStatus,
    refetch: postRefetch,
  } = useQuery(["getPostReportList", page], () => getPostReportList(page), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: commentData,
    status: commentStatus,
    refetch: commentRefetch,
  } = useQuery(["getCommentReportList",page], () => getCommentReportList(page), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const {
    data: chatRoomData,
    status: chatRoomStauts,
    refetch: chatRefetch,
  } = useQuery(["getChatRoomReportList",page], () => getChatRoomReportList(page), {
    retry: false,
    refetchOnWindowFocus: false,
  });
console.log(postData)
  return (
    <div className={styles.container}>
      <Form onChange={handleRadioOnChange}>
        <div className={`mb-3 radio ${styles.radioForm}`}>
          <Form.Check
            inline
            label="게시글 신고"
            value="post"
            name="group1"
            type="radio"
            defaultChecked
          />
          <Form.Check
            inline
            label="댓글 신고"
            value="comment"
            name="group1"
            type="radio"
          />
          <Form.Check
            inline
            label="채팅 신고"
            value="chat"
            name="group1"
            type="radio"
          />
        </div>
      </Form>

      <h2 className={styles.title}>신고목록</h2>
      <div className={styles.reportBox}>
        <div className={styles.reportList}>
          <ReportItems
            postData={postData}
            postStatus={postStatus}
            postRefetch={postRefetch}
            type={type}
            setType={setType}
            commentData={commentData}
            commentStatus={commentStatus}
            commentRefetch={commentRefetch}
            chatRoomData={chatRoomData}
            chatRoomStauts={chatRoomStauts}
            chatRefetch={chatRefetch}
          />
          
        </div>
        {type === "post" ? (
            <div className={styles.reportPaging}>
            {postData?.list.length == 0 ? null : <Paging
              data={postData}
              status={postStatus}
              page={page}
              setPage={setPage}
            />}
            </div>
          ) : type === "comment" ? (
            <div className={styles.reportPaging}>
             {commentData?.list.length == 0 ? null : <Paging
              data={commentData}
              status={commentStatus}
              page={page}
              setPage={setPage}
            />}
            </div>
          ) : type === "chat" ? (
            <div className={styles.reportPaging}>
              {chatRoomData?.list.length == 0 ? null : <Paging
              data={chatRoomData}
              status={chatRoomStauts}
              page={page}
              setPage={setPage}
            />} 
            
            </div>
          ) : null}
      </div>
    </div>
  );
}

export default ReportList;
