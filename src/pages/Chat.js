import React, { useEffect, useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList, getChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";
import {ReactComponent as ChatIcon} from "../svg/chat-dots.svg"
import { useLocation } from "react-router";

function Chat() {
  const location = useLocation()
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [roomId, setRoomId] = useState(location.state?.roomId || null);
 
  socket.emit("joinList")

  const { data: listData, status: listStatus, refetch: listRefetch } = useQuery(
    ["getChatList"],
    () => getChatList(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );


  useEffect(() => {
    socket.on("noti", () => listRefetch())
    return () => {
      socket.emit("leaveList")
      socket.off("noti", () => listRefetch())
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.listCon}>
        <ChatList listData={listData} listStatus={listStatus} listRefetch={listRefetch} setRoomId={setRoomId} roomId={roomId} />
      </div>
      <div className={styles.roomCon}>
        {roomId === null ? (
          <div className={styles.startChat}>
            <ChatIcon width={"50%"} fill="#bbb" height={"50%"} className={styles.chatIcon}></ChatIcon>
            <p>채팅을 시작해보세요</p>
          </div>
        ) : (
          <ChatRoom roomId={roomId} listRefetch={listRefetch} />
        )}
      </div>


    </section>
  );
}

export default Chat;
