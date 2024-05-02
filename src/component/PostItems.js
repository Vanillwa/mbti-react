import React, { useEffect, useState } from "react";
import styles from "../css/PostList.module.css";
import { Link } from "react-router-dom";
import noImg from '../images/noImg.png'
import UserDropdown from "./userDropdown";
const PostItems = ({ data, status }) => {

  const [readhit, setReadhit] = useState(0)


  const handleListClick=()=>{
    setReadhit(readhit + 1)
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
  if(data.list.length == 0 ){
    return(
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    )
  }
  
  return (
    <>
      {data.list.map((item) => {
        const showImg = item.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/);
        const imgSrc = showImg ? showImg[1] : noImg;
        return (
          <div className={styles.postWrap} key={item.postId}>
            <div className={styles.postHeader}>
            <UserDropdown item={item} />
              
              <div className={styles.dateReadhitBox} onClick={handleListClick}>
                <div className={styles.likes}>❤  {item.like}</div>
                <div className={styles.readhit}>조회수 : {item.readhit}</div>
                <div className={styles.date}>작성일 : {new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
              
            </div>
            <div className={styles.postBody}>
              <Link to={`/post/view?postId=${item.postId}`} className={styles.content}>
                <div className={styles.imgBox}>
                  <div className={styles.thumbnail}><img className={styles.img} src={imgSrc}/></div>
                </div>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
      
    </>
  );
};

export default PostItems;
