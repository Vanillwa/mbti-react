import React, { useEffect, useState } from "react";
import styles from "../css/postViewComment.module.css";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { QueryClient, useMutation, useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import notImg from "../svg/person-circle.svg";

import {
  EditViewComment,
  deleteViewComment,
  getViewComment,
  postViewComment,
} from "../service/api/commentAPI";

import Paging from "../component/Paging";
import CommentReportModal from "./CommentReportModal";
import { Dropdown, Form } from "react-bootstrap";
import { ReactComponent as ThreeDots } from "../svg/three-dots.svg"
import ViewUserDropdown from "./ViewUserDropdown";

function ViewComment() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const [inputContent, setInputContent] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글의 내용을 임시 저장합니다.

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState("desc");

  // 댓글 리스트 조회
  const { data, status, refetch } = useQuery(
    ["getViewComment", postId, page, size, order],
    () => getViewComment(postId, page, size, order),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  //등록 뮤테이트
  const postMutate = useMutation((body) => {
    return postViewComment(body);
  });
  //수정뮤테이트
  const EditMutate = useMutation((body) => {
    return EditViewComment(body);
  });

  //삭제 뮤테이트
  const deleteMutate = useMutation((commentId) => {
    return deleteViewComment(commentId);
  });

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
        console.log("onSuccess");
        await queryClient.invalidateQueries(["getViewComment", postId]);
        await refetch();
        setInputContent("");
        return;
      },
    });
  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content); // 현재 댓글의 내용을 임시 state에 저장합니다.
  };

  const handleEditSubmit = (event, commentId) => {
    event.preventDefault();
    const body = {
      commentId: commentId,
      postId: postId,
      content: editingContent,
    };

    EditMutate.mutate(body, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getViewComment"], postId);
        setEditingCommentId(null);
        await refetch();
        return;
      },
    });
  };

  // 삭제 핸들러
  const handleCommentDelete = (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deleteMutate.mutate(commentId, {
      onSuccess: async () => {
        console.log("onSuccess");
        await queryClient.invalidateQueries(["getViewComment", postId]);
        await refetch();
        return;
      },
    });
  };

  const handleOrderChange = (e) => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };
  //로그인버튼
  const handleRequestLogin = () => {
    navigate("/", { state: "login" });
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
    </a>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>댓글</span>
        <Form className={styles.orderBox} onChange={handleOrderChange}>
          <Form.Group controlId="orderSelect" >
            <Form.Control as="select" value={order} readOnly >
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className={styles.list}>
        {data.commentList.length === 0 ? <div className={styles.noComment}>작성된 댓글이 없습니다.</div> :
          <>
            {data.commentList.map((item) => {
              return item.status == "ok" ? (editingCommentId === item.commentId) ?
                <form key={item.commentId} className={styles.commentBox} onSubmit={(event) => handleEditSubmit(event, item.commentId)}>
                  <div className={styles.commentUserInfo}>
                    <div className={styles.commentProfileImageWrap}>
                      <img src={userInfo.profileImage} alt="" />
                    </div>
                    <div className={styles.commentNickname}>{userInfo.nickname}</div>
                  </div>
                  <textarea className={styles.editInput} value={editingContent} onChange={(e) => setEditingContent(e.target.value)} cols={1} rows={1} required></textarea>
                  <div>
                    <button className={`${styles.commentBtn} btn btn-primary`}>완료</button>
                  </div>
                </form>
                : (
                  <div key={item.commentId} className={styles.commentBox}>
                    <ViewUserDropdown data={item} />
                    <>
                      <div className={styles.commentContent}>{item.content}</div>
                      <div className={styles.commentRight}>
                        <div className={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString()}</div>
                        {isLoggedIn ? <Dropdown >
                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <ThreeDots width="18px" height='18px' />
                          </Dropdown.Toggle>
                          <Dropdown.Menu >
                            {userInfo.userId != item.userId ? <Dropdown.Item eventKey="1"><CommentReportModal commentId={item.commentId} /></Dropdown.Item> : null}
                            {userInfo?.userId == item.userId && isLoggedIn ? (
                              <>
                                <Dropdown.Item eventKey="2" onClick={() => handleEditClick(item.commentId, item.content)}>수정</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={() => handleCommentDelete(item.commentId)}>
                                  삭제
                                </Dropdown.Item>
                              </>
                            ) : null}
                          </Dropdown.Menu>
                        </Dropdown> : null}
                      </div>
                    </>

                  </div>
                ) : item.status == "deleted" ? (
                  <div key={item.commentId} className={styles.commentAlert}>삭제된 댓글입니다.</div>
                ) : (
                <div key={item.commentId} className={styles.commentAlert}>차단된 댓글입니다.</div>
              );

            })}
            <div className={styles.paging} >
              {data.commentList?.length == 0 ? null : <Paging data={data} status={status} page={page} setPage={setPage} />}
            </div>
          </>
        }
      </div >
      {
        isLoggedIn ? (
          <form onSubmit={handleCommentSubmit} className={styles.commentForm} >
            <div className={styles.commentUserInfo}>
              <div className={styles.commentProfileImageWrap}>
                <img src={userInfo.profileImage} alt="" />
              </div>
              <div className={styles.commentNickname}>{userInfo.nickname}</div>
            </div>
            <textarea className={styles.commentInput} name="content" value={inputContent} onChange={(e) => setInputContent(e.target.value)} required placeholder="댓글" rows={1} cols={1}></textarea>
            <div>
              <button type="submit" className={`${styles.commentBtn} btn btn-primary`}>작성</button>
            </div>
          </form>
        ) : (
          <div className={styles.needLogin}>
            <span>로그인 후 댓글서비스 이용이 가능합니다.</span>
            <span type="button" onClick={handleRequestLogin} >로그인 하기</span>
          </div>
        )}

    </div >
  );
}

export default ViewComment;
