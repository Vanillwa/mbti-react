import React from "react";
import styles from "../css/postView.module.css";
import { useSearchParams } from "react-router-dom";
import { getPostView } from "../service/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from '../svg/person-circle.svg'
function PostView() {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const { data, status } = useQuery(
    ["getPostView", postId],
    () => getPostView(postId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
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
  let img = userInfo.profileImage;
  if(img == null ){
    img = notImg
  }

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  const differenceInMilliseconds = now - createdAt;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  let dateDisplay;
  if (differenceInHours < 24) {
    dateDisplay = `${differenceInHours}시간 전`;
  } else if (differenceInDays <= 7) {
    dateDisplay = `${differenceInDays}일 전`;
  } else {
    dateDisplay = createdAt.toLocaleDateString("ko-KR");
  }

  return (
    <div className={styles.container}>
      <div className={styles.mbti}>{data.category} 게시판</div>
      <div className={styles.header}>
        
        <div className={styles.nickname}>
          <img className={styles.userImg} src={data.User.profileImage ? data.User.profileImg : notImg}/>
          {data.User.nickname}
          </div>
        <div className={styles.date}>{dateDisplay}</div>
      </div>
      <div className={styles.main}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.image}>{data.image}</div>
        <div className={styles.content}>{data.content}</div>
      </div>
      <form className={styles.commentForm}>
        <img className={styles.myImg} src={img}></img>
        <span className={styles.label}>{userInfo.nickname} :</span>
        <input className={styles.commentInput} />
        <div type="button">작성</div>
      </form>
      <div className={styles.comment}>
        <div className={styles.commentName}></div>
        <div className={styles.commentContent}></div>
        <div className={styles.commentDate}></div>
      </div>
      
    </div>
  );
}

export default PostView;
