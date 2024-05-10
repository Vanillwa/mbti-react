import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import styles from "../css/ChatRoom.module.css";
import { getChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import sweetalert from "../component/sweetalert";
import { PiSirenFill } from "react-icons/pi";
import { socket } from "../service/socket/socket";

function ChatRoom() {
  console.log('rendered')
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [chat, setChat] = useState([]);

  const { data, status } = useQuery(["getChatRoom", roomId], () => getChatRoom(roomId), {
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
    socket.emit("send-message", body);
    e.target.message.value = "";
  };

  useEffect(() => {
    const handleReceiveMessage = (newData) => {
      console.log("newData : ", newData);
      setChat((prevChat) => [newData, ...prevChat]);
    };
    socket.on("send-message", handleReceiveMessage);
    return () => {
      socket.emit('leave')
      socket.off("send-message", handleReceiveMessage);
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
      <h4 className="pt-3 pb-3">{data.roomInfo.title}</h4>
      <div className={styles.chatForm}>
        {chat.map(message => {
          if (userInfo.userId === message.userId) {
            return (
              <div key={message.messageId}
                className={`${styles.message} ${styles.mine}`}>
                <div className={styles.mineContent}>
                  <div className={styles.myMessageInner}>{message.message}</div>
                </div>
              </div>
            );
          } else {

            return (

              <div key={message.messageId} className={`${styles.message}`}>
                <div className={styles.profileBox}>
                  <img className={styles.userImg} src={message.User.profileImage} />

                </div>
                <div className={styles.messageInner}>
                  <div className={styles.messageContent}>

                    <div className={styles.messageNickname}>
                      {message.User.nickname}
                    </div>
                    <div className={styles.messageMsg}>
                      {message.message}
                    </div>

                  </div>

                </div>
                <div className={styles.messageBtnBox}>
                  <button type="button" className={styles.reportBtn}>
                    <PiSirenFill />
                  </button>
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
