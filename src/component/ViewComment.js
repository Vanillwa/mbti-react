import React, { useEffect } from "react";
import styles from "../css/postView.module.css";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";
import { deleteViewComment, getViewComment, postViewComment } from "../service/api";
function ViewComment() {
  const queryClient = new QueryClient()

  const writeComment = useMutation((body)=>postViewComment(body), {
    onSuccess : ()=>{
      queryClient.invalidateQueries(['getViewComment', postId])
    }
  });
  

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const { data, status } = useQuery(
    ["getViewComment", postId],
    () => getViewComment(postId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  
  let img = userInfo?.profileImage;
  if (img == null && !isLoggedIn) {
    img = notImg;
  }


  const handleDelete = async(commentId)=>{
    try {
      alert('정말 삭제하시겠습니까?')
      await deleteViewComment(commentId)
      alert('삭제 완료')
      queryClient.invalidateQueries({queryKey:['getViewComment', postId]})
    } catch (error) {
      console.error('삭제중 오류', error)
      alert('삭제 실패')
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const body = {
      postId: postId,
      content: e.target.content.value,
      userId: userInfo.userId,
    };
    const result = writeComment.mutate(body);
    
    // if (result.message == "success") {
    //   alert("작성 완료");
      
    // }
    alert('작성완료')
  };


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

  return (
    <div className={styles.container}>
      <div>
      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <img className={styles.myImg} src={img}></img>
          <span className={styles.label}>{userInfo?.nickname} :</span>
          <input className={styles.commentInput} name="content" />
          <button type="submit">작성</button>
        </form>
      ) : (
        <div className={styles.commentForm}>
          로그인 후 댓글서비스 이용이 가능합니다.{" "}
          <Link className="fw-bold" to="/">
            로그인 하기
          </Link>
        </div>
      )}
        {data.map((item) => {
          return (
            <div className={styles.commentBox}>
              <div className={styles.commentName}>{item.User.nickname}</div>
              <div className={styles.commentContent}>{item.content}</div>
              <div className={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString()}</div>
              {userInfo?.userId == item.userId ? <div className={styles.buttonBox}>
              <div onClick='' type='button'>수정</div>
              <div onClick={()=>handleDelete(item.commentId)} type='button'>삭제</div>
              </div> : <div></div>}
            </div>
          );
        })
      }
    </div>
    </div>
  );
}

export default ViewComment;
