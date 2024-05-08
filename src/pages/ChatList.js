import React, { useState } from "react";
import styles from "../css/Chat.module.css";
import Navbar from "../component/Navbar";
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
  console.log(data);

  return (
    <>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatList;
