import React, { useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList } from "../service/api/chatAPI";
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
  console.log(data)
  return (
    <>

      <div className={styles.container}>
        <h2>채팅목록</h2>
        <div className={styles.chatBox}>
          <div className={styles.chatItems}>
            {data.map((item) => {
              console.log(item)
              return (
              <Link to={`/chat/list/${item.roomId}`} className={styles.itemBox} key={item.roomId}>
                <div className="">{item.title}</div>
                <div className=""></div>
              </Link>
              )
            })}
          </div>
        </div>
      </div>

    </>


  );
};

export default ChatList;
