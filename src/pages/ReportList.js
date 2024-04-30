import React from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getPostReportList } from "../service/api";
import styles from "../css/ReportList.module.css"
import { Button } from "bootstrap";

function ReportList(){
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
      if(data.length == 0){
        return(
          <div>
            <h1>작성된 글이 없습니다.</h1>
          </div>
        )
      }

    return(
        
      <div className={styles.reportBox}>
            <h1>신고 목록</h1>
        <div className={styles.reportList}>
            {data.map((item)=>{
                return(
                   
                    <div className={styles.reportListBox}  key={item.reportId}>
                     <Link className={`col-6 ${styles.reportLink}`} to={`/post/view?postId=${item.Post.postId}`}>
                        <div>
                    <span >글번호:{item.Post.title}</span>
                    <span>신고자:{item.User.nickname}</span>
                    <span>신고유형:{item.type}</span>
                    </div>
                    </Link>
                    <button className={styles.banBtn}>차단</button>
                
                    </div>
                    
                )
            })}
        </div>
      </div>
    )
}

export default ReportList