import React, { useEffect, useRef, useState } from "react";
import styles from "../css/postView.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ClickPostLikes,
  getPostView,
  postDelete,
} from "../service/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";
import ReportModal from "./ReportModal";

function ViewContent() {
  const [likes, setLikes] = useState("checked");
  const navigate = useNavigate();


  /**좌우스크롤 먼저 실행되게 하는 함수*/
  const contentRef = useRef(null);

  useEffect(() => {
    const handleWheel = e => {
      if (e.deltaY != 0) {
        e.preventDefault();
        contentRef.current.scrollLeft += e.deltaY + e.deltaX;
      }
    };
    let contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("wheel", handleWheel);
      }
    };
  });

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

  let img = userInfo?.profileImage;
  if (img == null && !isLoggedIn) {
    img = notImg;
  }
  const goEdit = () => {
    navigate(`/post/edit?postId=${data.postId}`);
  };

  const handleDelete = async () => {
    try {
      alert("정말 삭제하시겠습니까?");
      await postDelete(postId);
      alert("삭제 완료");
      navigate("/post/list");
    } catch (error) {
      console.error("삭제중 오류", error);
      alert("삭제 실패");
    }
  };

  const handleLikeClick = async () => {
    const result = await ClickPostLikes(data.postId);
    if (result.message == "success") {
      console.log("좋아요 눌렀음.");
    } else if (result.message == "duplicated") {

    }
    console.log(result.message);
    
  };

  function ContentComponent({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
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

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  const differenceInHours = Math.floor((now - createdAt) / 1000 / 60 / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  let dateDisplay;
  if (differenceInHours < 24) {
    dateDisplay = `${differenceInHours}시간 전`;
  } else if (differenceInDays <= 7) {
    dateDisplay = `${differenceInDays}일 전`;
  } else {
    dateDisplay = createdAt.toLocaleDateString("ko-KR");
  }
  console.log(data)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mbti}>
          <span>{data.category} 게시판</span>
          <div className={styles.readhit}>조회 : {data.readhit}</div>
          <div className={styles.like}>좋아요 : {data.like}</div>
          <div>
          <ReportModal/>
          {userInfo?.userId == data.User.userId && isLoggedIn ? (
            <div className="d-flex">
              <div className={styles.editBtn} type="button" onClick={goEdit}>
                수정
              </div>
              <div
                onClick={handleDelete}
                className={styles.delBtn}
                type="button">
                삭제
              </div>
            </div>
            
          ) : null}
          </div>
          
          

        </div>
        <div className={styles.editBox}></div>
        <div className={styles.header}>
          <div className={styles.nickname}>
            <img
              className={styles.userImg}
              src={data.User.profileImage ? data.User.profileImg : notImg}
            />
            {data.User.nickname}
          </div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.date}>{dateDisplay}</div>
        </div>
        <div className={styles.main}>
          <div className={styles.content} ref={contentRef}>
            <ContentComponent content={data.content} />
          </div>
          <div className={styles.likesBox}>
            <div
              type="button"
              className={styles[likes]}
              onClick={handleLikeClick}>
              좋아요❤
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewContent;
