import React, { useEffect, useState } from "react";
import styles from "../css/postView.module.css";

import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { QueryClient, useMutation, useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";
import { EditViewComment, deleteViewComment, getViewComment, postViewComment } from "../service/api";
function ViewComment() {
  const queryClient = new QueryClient()

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글의 내용을 임시 저장합니다.


  // 댓글 리스트 조회
  const { data, status , refetch } = useQuery(["getViewComment", postId], () => getViewComment(postId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  
  //등록 뮤테이트
  const postMutate = useMutation(body => {
    return postViewComment(body)
  })
  //수정뮤테이트
  const EditMutate = useMutation(body=>{
    return EditViewComment(body)
  })

  //삭제 뮤테이트
  const deleteMutate = useMutation(commentId => {
    return deleteViewComment(commentId)
  })

  let img = userInfo?.profileImage;
  if (img == null && !isLoggedIn) {
    img = notImg;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const body = {
      postId: postId,
      content: e.target.content.value,
      userId: userInfo.userId,
    };
    
    postMutate.mutate(body, {
      onSuccess: async () => {
        console.log('onSuccess')
        await queryClient.invalidateQueries(["getViewComment", postId])
        await refetch()
        return
      }
    })

  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content); // 현재 댓글의 내용을 임시 state에 저장합니다.
  };

  const handleEditSubmit = (event, commentId)=>{
    event.preventDefault();
    const body = {
      commentId : commentId,
      postId : postId,
      content : editingContent,
    };

    EditMutate.mutate(body,{
      onSuccess : async()=>{
        await queryClient.invalidateQueries(["getViewComment"],postId)
        setEditingCommentId(null)
        await refetch()
        return
      }
    })
  }
  

  // 삭제 핸들러
  const handleCommentDelete = (commentId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    deleteMutate.mutate(commentId, {
      onSuccess: async () => {
        console.log('onSuccess')
        await queryClient.invalidateQueries(["getViewComment", postId])
        await refetch()
        return
      }
    })
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

  return (
    <div className={styles.container}>
      <div>
        {isLoggedIn ? (
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <img className={styles.myImg} src={img} alt=""></img>
            <span className={styles.label}>{userInfo?.nickname} :</span>
            <input className={styles.commentInput} name="content" />
            <div type="submit">작성</div>
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
            <div key={item.commentId} className={styles.commentBox}>
              <div className={styles.commentName}>{item.User.nickname}</div>
              {editingCommentId === item.commentId ? (<form className={styles.editCommentForm} onSubmit={(event)=>handleEditSubmit(event, item.commentId)}><input
                className={styles.editInput}
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              /> 
                <button className={styles.editBtn}>완료</button>
              </form>) : (<><div className={styles.commentContent}>{item.content}</div>
                <div className={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString()}</div>
              </>)}
              
              
              {userInfo?.userId == item.userId ? <div className={styles.buttonBox}>
                {editingCommentId === item.commentId ? <></> : <>
                  <button className={styles.editBtn} type='button' onClick={()=>{
                    handleEditClick(item.commentId, item.content)
                  }}>수정</button>
                  <button type='button' onClick={() => handleCommentDelete(item.commentId)}>삭제</button>
                </>}
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
