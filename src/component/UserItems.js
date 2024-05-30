import { QueryClient, useMutation, useQuery } from "react-query";
import { releaseUser, suspendUser } from "../service/api/reportAPI";

import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/UserList.module.css";
import sweetalert from "./sweetalert";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
//import { socket } from "../service/socket/socket";
function UserItems({ data, status, filter, keyword, type, refetch }) {
  const blockRef = useRef();
  const [show, setShow] = useState(false);
  const { memoUserInfo, socket } = useAuthContext();
  const { userInfo } = memoUserInfo;
  const [user, setUser] = useState();
  const queryClient = new QueryClient();

  const handleClose = () => setShow(false);

  const releaseMutate = useMutation(userId => {
    return releaseUser(userId);
  });
  const handleSubmit = async e => {
    e.preventDefault();
    const alertResult = await sweetalert.question(
      "정말 정지시키겠습니까?",
      "",
      "네",
      "아니오"
    );
    if (alertResult.dismiss) return;

    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({
      postId: null,
      userId: user.userId,
      blockDate,
    });
    if (result.message === "success") {
      sweetalert.success("정지 완료");
      socket.emit("blockUser", user.userId);
      setShow(false);
      refetch();
    } else if (result.message === "fail") {
      sweetalert.warning("오류 발생");
    }
  };

  const handleRelease = async userId => {
    const alertResult = await sweetalert.question(
      "차단해제 하시겠습니까",
      "",
      "네",
      "아니오"
    );
    if (alertResult.dismiss) return;
    releaseMutate.mutate(userId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "getUserList",
          filter,
          keyword,
          type,
        ]);
        await refetch();
        return;
      },
    });
    // const result =await releaseUser(userId)
  };

  const handleShowModal = user => {
    console.log(user);
    if (user.userId != userInfo.userId) {
      setUser(user);
      setShow(true);
    } else if (user.role === "admin") {
      sweetalert.warning("관리자는 차단할 수 없습니다");
    }
  };

  const handleBlock = userId => {
    releaseMutate.mutate(userId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "getUserList",
          filter,
          keyword,
          type,
        ]);
        await refetch();
        return;
      },
    });
    // const result =await releaseUser(userId)
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

  if (data.result.length === 0) {
    return (
      <>
        <h1>검색결과가 없습니다.</h1>
      </>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.blockModalForm} onSubmit={handleSubmit}>
            닉네임: {user?.nickname}
            <select className="me-2" ref={blockRef}>
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={7}>7일</option>
            </select>
            <button className={styles.blockModalBtn} type="submit">
              정지
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={`container ${styles.container}`}>
        {data.result.map(item => {
          console.log(item);
          return item.email === "deleted" ? null : (
            <div className={` row ${styles.userinfo}`} key={item.userId}>
              <span className={`col-2 ${styles.userId}`}>
                유저ID: {item.userId}
              </span>
              <span className={`col-4 ${styles.userEmail}`}>
                이메일: {item.email}
              </span>
              <span className={`col-3 ${styles.userNickname}`}>
                <Link to={`/user/${item.userId}`}>
                닉네임: {item.nickname}
                </Link>
              </span>
              <span className={`col-2 ${styles.userStatus}`}>
                상태: {item.status}
              </span>

              {item.status === "blocked" ? (
                <button
                  type="button"
                  className={`col-1 btn btn-primary btn-ghost ${styles.blockBtn}`}
                  onClick={() => handleRelease(item.userId)}>
                  차단해제
                </button>
              ) : item.userId != userInfo.userId ? (
                <button
                  type="button"
                  className={`col-1 btn btn-danger btn-ghost ${styles.blockBtn}`}
                  onClick={() => handleShowModal(item)}>
                  차단하기
                </button>
              ) : (
                <button
                  className={`col-1 btn btn  ${styles.blockBtn}`}
                  onClick={() => {
                    sweetalert.warning("자기 자신은 차단할 수 없습니다.");
                  }}>
                  나야나😏
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserItems;
