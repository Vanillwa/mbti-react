import React from "react";
import styles from "../css/PostList.module.css";
import { Link } from "react-router-dom";
import UserDropdown from "./userDropdown";
import like from "../svg/like.svg";
import eye from "../svg/eye.svg";

const PostItems = ({ data, status }) => {
  return (
    <>
      {data.list.map(item => {
        console.log(item)
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

        function removeHTMLTags(htmlString) {
          return htmlString.replace(/<[^>]*>?/gm, "");
        }
        return (
          <div className={styles.container} key={item.postId}>
            <Link
              to={`/post/view?postId=${item.postId}`}
              className={styles.postWrap}>
              <div className={styles.postContent}>
                
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{removeHTMLTags(item.content)}</div>
                <div className={styles.readhitBox}>
                  <UserDropdown item={item.User} />
                  <div className={styles.date}>{dateDisplay}</div>
                  <div className={styles.likes}>
                    <img src={like} alt="likes" /> {item.like}
                  </div>
                  <div className={styles.readhit}>
                    <img src={eye} alt="views" /> {item.readhit}
                  </div>
                </div>
              </div>

              {imgSrc && (
                <div className={styles.imgBox}>
                  <div className={styles.thumbnail}>
                    <img className={styles.img} src={imgSrc} alt="thumbnail" />
                  </div>
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default PostItems;
