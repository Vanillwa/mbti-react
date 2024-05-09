import React, { useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList } from "../service/api/api";
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

              </div>
            )
            
          })}
        </div>
        </div>
      </div>

    </>
  

  );
};

export default ChatList;
