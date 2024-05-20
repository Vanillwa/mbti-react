import React from "react";
import styles from "../css/PostList.module.css";
import { Link } from "react-router-dom";
import UserDropdown from "./userDropdown";
import like from "../svg/like.svg";
import eye from "../svg/eye.svg";
const PostItems = ({ data, status }) => {
  
  
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
  if (data.list.length == 0) {
    return (
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    );
  }

  return (
    <>
      {data.list.map((item) => {
        const createdAt = new Date(item.createdAt);
        const now = new Date();
        const differenceInSeconds = Math.floor((now - createdAt) / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);
      
        let dateDisplay;
        if (differenceInMinutes < 60) {
          dateDisplay = `${differenceInMinutes}분 전`;
        } else if (differenceInHours < 24) {
          dateDisplay = `${differenceInHours}시간 전`;
        } else if (differenceInDays <= 7) {
          dateDisplay = `${differenceInDays}일 전`;
        } else {
          dateDisplay = createdAt.toLocaleDateString("ko-KR");
        }
      
        const showImg = item.content.match(
          /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
        );
        const imgSrc = showImg ? showImg[1] : null;
        return (
          <div className={`${styles.container} container`} key={item.postId}>
            <Link
              to={`/post/view?postId=${item.postId}`}
              className={`${styles.postWrap} row-cols-2`}
            >
              <div className={`${styles.postContent} col-8`}>
                <div className={styles.header}>
                  <UserDropdown item={item.User}/>
                  <div className={`${styles.title} col-4`}>{item.title}</div>
                </div>
                <div className={`${styles.readhitBox}`}>
                  <div className={styles.date}>
                    {dateDisplay}
                  </div>
                  <div className={styles.likes}>
                    <img src={like} /> {item.like}
                  </div>
                  <div className={styles.readhit}>
                    <img src={eye} /> {item.readhit}
                  </div>
                </div>
              </div>
              <div className={`${styles.imgBox} col-4`}>
                <div className={styles.thumbnail}>
                  <img className={styles.img} src={imgSrc} />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default PostItems;
