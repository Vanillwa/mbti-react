import React, { useEffect, useState } from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList, getChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

function Chat() {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [roomId, setRoomId] = useState(null);

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
    socket.on("noti", ()=>listRefetch())
    return () => {
      socket.emit("leaveList")
      socket.off("noti", ()=>listRefetch())
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.listCon}>
        <ChatList listData={listData} listStatus={listStatus} listRefetch={listRefetch} setRoomId={setRoomId} roomId={roomId} />
      </div>
      <div className={styles.roomCon}>
        {roomId === null ? (
          <div >채팅을 시작하세요</div>
        ) : (
          <ChatRoom roomId={roomId} listRefetch={listRefetch} />
        )}
      </div>


    </section>
  );
}

export default Chat;