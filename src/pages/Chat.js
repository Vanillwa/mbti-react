import React, { useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList, getChatRoom } from "../service/api/chatAPI";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";
function Chat() {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [roomId, setRoomId] = useState(null);

  return (
    <section className={styles.section}>
      <ChatList setRoomId={setRoomId} />
      {roomId === null ? <div>채팅을 시작하세요</div> : <ChatRoom roomId={roomId} />}
    </section>
  );
}

export default Chat;
