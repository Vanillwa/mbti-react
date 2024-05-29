import React from "react";
import styles from "../css/CardItems.module.css";
import { Link } from "react-router-dom";
import like from "../svg/like.svg";
import eye from "../svg/eye.svg";
import ViewUserDropdown from "./ViewUserDropdown";

const PostItems = ({ data, status }) => {
  return (
    <><div className={styles.body}>
      {data.length > 0 ?
      data.list.map((item) => {
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
        console.log(item);

        const showImg = item.content.match(
          /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
        );
        const imgSrc = showImg ? showImg[1] : null;

        function removeHTMLTags(htmlString) {
          return htmlString.replace(/<[^>]*>?/gm, "");
        }
        return (
          <div className={`${styles.container}`} key={item.postId}>
            <div className={styles.header}>
              <ViewUserDropdown data={item} />
            </div>
            <Link to={`/post/view?postId=${item.postId}`} className={styles.contentWrap}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.imageBox}>
                <img src={imgSrc} />
              </div>
              <div className={styles.content}>
                {removeHTMLTags(item.content)}
              </div>
              <div className={styles.readhitBox}>
                <div className={styles.date}>{dateDisplay}</div>
                <div className="d-flex gap-3">
                  <div className={styles.likes}>
                    <img src={like} alt="likes" /> {item.like}
                  </div>
                  <div className={styles.readhit}>
                    <img src={eye} alt="views" /> {item.readhit}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      }) : <div>작성된 글이 없습니다.</div>}
      </div>
    </>
  );
};

export default PostItems;
