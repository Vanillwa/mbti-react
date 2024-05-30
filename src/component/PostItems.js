import React from "react";
import styles from "../css/PostList.module.css";
import { Link } from "react-router-dom";
import ListUserDropdown from "./ListUserDropdown";

const PostItems = ({ data, status }) => {
  return (
    <><div className={styles.contentHeader}>
      <div className={styles.type1}>게시판</div>
      <div className={styles.type2}>제목</div>
      <div className={styles.type3}>유저 정보</div>
      <div className={styles.type4}>작성일</div>
      <div className={styles.type5}>좋아요</div>
      <div className={styles.type6}>조회수</div>
    </div>

      { data.list.length === 0 ? <div>작성된 글이 없습니다.</div> :
      data.list.map(item => {
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
        return (
          <div className={styles.container} key={item.postId}>
            <div
              className={styles.postWrap}>
              <div className={styles.postContent}>
                <div className={styles.postMbti}>{item.category ? item.category : '없음'}</div>
                <Link to={`/post/view?postId=${item.postId}`} className={styles.title}><div className={styles.span}>{item.title}</div></Link>
                {/* <div className={styles.content}>{removeHTMLTags(item.content)}</div> */}
                {/* <UserDropdown item={item.User} /> */}
                <div className={styles.nickname}><ListUserDropdown data={item.User}/></div>
                  <div className={styles.date}>{dateDisplay}</div>
                  <div className={styles.likes}>
                    {/* <img src={like} alt="likes" />*/} {item.like} 
                  </div>
                  <div className={styles.readhit}>
                    {/* <img src={eye} alt="views" />*/} {item.readhit} 
                  </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostItems;
