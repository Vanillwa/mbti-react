import { QueryClient, useMutation, useQuery } from "react-query";


import { releaseUser, suspendUser } from "../service/api/reportAPI";

import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../css/UserList.module.css";
import sweetalert from "./sweetalert";
function UserItems({data,status, filter, keyword, type , refetch}) {
  const blockRef = useRef();
  const [show, setShow] = useState(false);

  const [user, setUser] = useState();
  const queryClient = new QueryClient();
  
  const handleClose = () => setShow(false);

  const releaseMutate = useMutation((userId) => {
    return releaseUser(userId);
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const addDay = blockRef.current.value * 24 * 60 * 60 * 1000;
    const blockDate = new Date(now.getTime() + addDay);
    const result = await suspendUser({ userId: user.userId, blockDate });
    sweetalert.success('정지 완료')
  };

  const handleRelease = (userId) => {
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

  const handleShowModal = (user) => {
    setUser(user);
    setShow(true);
  };

  const handleBlock = (userId) => {
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

  if(data.result.length === 0){
    return(
      <>
      <h1>검색결과가 없습니다.</h1>
      </>
    )
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>유저 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form className= {styles.blockModalForm}  onSubmit={handleSubmit}>
            {user?.nickname}
            <select className="me-2" ref={blockRef}>
              <option value={1}>1일</option>
              <option  value={3}>3일</option>
              <option value={7}>7일</option>
            </select>
            <button className={styles.blockModalBtn} type="submit">정지</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {data.result.map((item) => {
        return (

          <div className="container">
            <div className={`row ${styles.userinfo}`} key={item.userId}>
              <span className="col-2">유저ID: {item.userId}</span>
              <span className="col-4">이메일: {item.email}</span>
              <span className="col-3"> 닉네임: {item.nickname}</span>
              <span className="col-2">상태: {item.status}</span>

              {item.status === "blocked" ? (
                <button
                  type="button"
                  className={`col-1 btn btn-primary btn-ghost ${styles.blockBtn}`}
                  onClick={() => handleRelease(item.userId)}
                >
                  차단해제
                </button>
              ) : (
                <button
                  type="button"
                  className={`col-1 btn btn-primary btn-ghost ${styles.blockBtn}`}
                  onClick={() => handleShowModal(item)}
                >
                  차단하기
                </button>
              )}
            </div>
          </div>

        );
      })}
    </>
  );
}

export default UserItems;
