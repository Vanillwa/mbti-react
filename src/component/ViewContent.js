import React, { useEffect, useRef, useState } from "react";
import styles from "../css/postView.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clickPostLikes, getPostView, postDelete } from "../service/api/postAPI";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";
import ReportModal from "./PostReportModal";
import UserDropdown from "./userDropdown";
import sweetalert from "./sweetalert";

import { ReactComponent as Eye } from "../svg/eye.svg"
import { ReactComponent as ThreeDots } from "../svg/three-dots.svg"
import { ReactComponent as Like } from "../svg/like.svg"
import { Dropdown } from "react-bootstrap";
import ViewUserDropdown from "./ViewUserDropdown";

function ViewContent() {
  const [likes, setLikes] = useState("checked");
  const navigate = useNavigate();


  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const { data, status, refetch } = useQuery(
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
      const result = await sweetalert.question(
        "정말 삭제하시겠습니까?",
        "삭제 후엔 복구가 불가능합니다",
        "네",
        "아니오"
      );
      if (result.dismiss) {
        return;
      }
      await postDelete(postId);
      sweetalert.success("삭제 완료", "", "확인");
      navigate("/post/list");
    } catch (error) {
      sweetalert.error("에러", "삭제하지 못했습니다.", "확인");
    }
  };

  const handleLikeClick = async () => {
    const result = await clickPostLikes(data.postId);
    if (result.message == "success") {
      console.log("좋아요 눌렀음.");
      refetch();
    } else if (result.message == "duplicated") {
      console.log("추천함");
      sweetalert.warning("이미 추천한 게시물입니다.", "", "확인");
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
    </a>
  ));
  console.log(data)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.editBox}></div>
        <div className={styles.header}>
          <div className={styles.title}>{data.title}</div>
        </div>

        <div className={styles.main}>
          <div className={styles.content}>
            <ContentComponent content={data.content} />
          </div>
          <div type="button" className={styles.likeBtn} onClick={handleLikeClick}>
            <Like></Like>
            <div>( {data.like} )</div>
          </div>
        </div>
        <div className={styles.info}>
          <ViewUserDropdown user={data}/>
          <div className={styles.postInfo}>
            <div className={styles.readhit}><Eye /> {data.readhit}</div>
            <div className={styles.date}>{dateDisplay}</div>
            {isLoggedIn ? <Dropdown >
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <ThreeDots width='18px' height='18px' />
              </Dropdown.Toggle>
              <Dropdown.Menu >
                {userInfo.userId != data.User.userId ? <Dropdown.Item eventKey="1"><ReportModal data={data} /></Dropdown.Item> : null}
                {userInfo?.userId == data.User.userId && isLoggedIn ? (
                  <>
                    <Dropdown.Item eventKey="2" onClick={goEdit}>수정</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={handleDelete}>
                      삭제
                    </Dropdown.Item>
                  </>
                ) : null}
              </Dropdown.Menu>
            </Dropdown> : null}
          </div>
        </div>
      </div >
    </>
  );
}

export default ViewContent;
