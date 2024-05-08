import React, { useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList } from "../service/api";
import { Link } from "react-router-dom";
const ChatList = () => {
  const { data, status } = useQuery(["getChatList"], () => getChatList(), {
    retry: false,
    refetchOnWindowFocus: false,
  });


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

  if (data.length == 0) {
    return (
      <div>
        <h1>생성된 채팅방이 없습니다.</h1>
      </div>
    );
  }

  return (
    <>
<<<<<<< HEAD
      <div className={styles.container}>
        <h2>채팅목록</h2>
        <div className={styles.chatBox}>
        <div className={styles.chatItems}>
          {data.map((item)=>{
            const title = item.title
            const regex = /(?:^|\s)([\w가-힣]+)(?=님)/g;
            const matches = title.match(regex)
            return(<div className={styles.itemBox}>
              <div className="">상대방 : {matches[0]}</div>
              <Link to={`/chat/list/${item.roomId}`} className={styles.btn}>채팅하기</Link>
=======
    <div className={styles.container}>
      <Navbar />
      <div className={styles.postBox}>
        <div className="card">
          <div className="card-body">
            <div className="row g-5 col">
              <div className="d-flex gap-2 justify-content-center">
                <h2 className={styles.h2name}>유저 채팅방!</h2>
              </div>
              <div className="d-flex gap-2 justify-content-center">
                <p>채팅목록</p>
                {data.map(chat => (
                  <Link to={`/chat/list/${chat.roomId}`}>
                  <div key={chat.id} className="chat-room">
                    {chat.title}
                  </div>
                  </Link>
                ))}
>>>>>>> wogns
              </div>
            )
            
          })}
        </div>
        </div>
      </div>
<<<<<<< HEAD
    </>
  
=======
    </div>
    </>
>>>>>>> wogns
  );
};

export default ChatList;
