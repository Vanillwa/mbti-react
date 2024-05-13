import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import styles from "../css/ChatRoom.module.css";
import { getChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import sweetalert from "../component/sweetalert";
import { PiSirenFill } from "react-icons/pi";
import { socket } from "../service/socket/socket";
import ChatReportModal from "../component/ChatReportModal";

function ChatRoom({messages}) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [chat, setChat] = useState([]);


 

  const { data, status, refetch } = useQuery(["getChatRoom", roomId], () => getChatRoom(roomId), {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("로딩 완료", data);
      socket.emit("join", roomId);
      setChat(data.messageList);
    },
  });

  const sendMessage = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    if (message === "") return;
    let targetId =
      userInfo.userId === data.roomInfo.userId1
        ? data.roomInfo.userId2
        : data.roomInfo.userId1;
    let body = {
      roomId,
      message,
      targetId,
    };
    socket.emit("sendMessage", body);
    e.target.message.value = "";
  };

  useEffect(() => {
    const handleReceiveMessage = (newData) => {
      setChat((prevChat) => [newData, ...prevChat]);
    };

    const handleUserJoined = (newData) => {
      if (newData.targetId === userInfo.userId) setChat(newData.messages);
    }

    socket.on("sendMessage", handleReceiveMessage);
    socket.on("userJoined", handleUserJoined);
    return () => {
      socket.emit('leave', roomId)
      socket.off("sendMessage", handleReceiveMessage);
      socket.off("userJoined", handleUserJoined);
    };
  }, []);

 
  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>error</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.titleBox}>
      <h4 className="pt-3 pb-3">{data.roomInfo.title}</h4>
      <div>
        
       <ChatReportModal data={data}/>
       </div>
      </div>
      <div className={styles.chatForm} >
        
        {chat.map(message => {
          if (userInfo.userId === message.userId) {
            return (
              <div key={message.messageId} className={`${styles.message} ${styles.mine}`}>
                <div>
                  {message.isRead === 1 ? "" : "안읽음"}
                </div>
                <div className={styles.mineContent}>
                  <div className={styles.myMessageInner}>{message.message}</div>
                </div>
              </div>
            );
          } else {

            return (

              <div key={message.messageId} className={`${styles.message}`}>
                <div className={styles.profileBox}>
                  <img className={styles.userImg} src={message.sendUser.profileImage} />

                </div>
                <div className={styles.messageInner}>
                  <div className={styles.messageContent}>

                    <div className={styles.messageNickname}>
                      {message.sendUser.nickname}
                    </div>
                    <div className={styles.messageMsg}>
                      {message.message}
                      
                    </div>

                  </div>
                  <div>

                  </div>
                </div>
               
              </div>


            );
          }
        })}
      </div>
      <form onSubmit={sendMessage} className={styles.inputForm}>
        <input name='message' />
        <Button variant='secondary btn-sm' type='submit'>
          전송
        </Button>
      </form>
    </section>
  );
}

export default ChatRoom;
