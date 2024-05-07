import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getPostReportList } from "../service/api";
import styles from "../css/ReportList.module.css";
import { Button } from "bootstrap";

function ReportList() {
  const { data, status } = useQuery(
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

  return (

    <>
    <h2>신고목록</h2>
    <div className={styles.reportBox}>
      
      <div className={styles.reportList}>
        {data.map(item => {
          return (
            <div className={styles.reportListBox} key={item.reportId}>
              <Link
                className={`${styles.reportLink}`}
                to={`/post/view?postId=${item.Post.postId}`}>
                <div className={styles.reportContent}>
                  <span className={styles.reportId}>
                    글번호:{item.Post.postId}
                  </span>
                  <span className={styles.reportPerson}>
                    신고자:{item.User.nickname}
                  </span>
                  <span>신고유형:{item.type}</span>
                </div>
                <div className={styles.btnBox}>
                  <button type="button" className={styles.banBtn}>
                    차단
                  </button>
                  <button type="button" className={styles.cancelBtn}>
                    취소
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default ReportList;
