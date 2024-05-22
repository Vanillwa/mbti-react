import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../css/ChatRoom.module.css";
import { getChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";

import downImg from "../svg/arrow-down-circle.svg";

import ChatReportModal from "../component/ChatReportModal";

function ChatRoom({ roomId, listRefetch }) {

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [isBottom, setIsBottom] = useState(true);
  const [chat, setChat] = useState([]);

  const chatFormRef = useRef();
  const bottomRef = useRef();
  const { data: roomData, status: roomStatus, refetch: roomRefetch } = useQuery(
    ["getChatRoom", roomId],
    () => getChatRoom(roomId)
    ,
    {
      enabled: !!roomId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: async (data) => {
        console.log("로딩 완료", data);
        socket.emit("join", roomId);
        setChat(data.messageList);
        await listRefetch()
      },
    }
  );

  const sendMessage = e => {
    e.preventDefault();
    setIsBottom(true);
    let message = e.target.message.value;
    if (message === "") return;
    let targetId =
      userInfo.userId === roomData.roomInfo.userId1
        ? roomData.roomInfo.userId2
        : roomData.roomInfo.userId1;
    let body = { roomId, message, targetId };
    socket.emit("sendMessage", body);
    listRefetch();
    e.target.message.value = "";
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  };
  const scrollToBottomSmooth = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // 맨 아래로 스크롤

    const handleScroll = () => {
      const scrollTop = chatFormRef.current?.scrollTop;
      const scrollHeight = chatFormRef.current?.scrollHeight;
      const clientHeight = chatFormRef.current?.clientHeight;
      if (scrollHeight - scrollTop == clientHeight) setIsBottom(true);
      else setIsBottom(false);
    };
    const chatForm = chatFormRef.current;
    if (chatForm) chatForm.addEventListener("scroll", handleScroll);

    return () => {
      if (chatForm) chatForm.removeEventListener("scroll", handleScroll);
    };
  }, [roomData]);

  useEffect(() => {
    if (isBottom) scrollToBottom();
  }, [chat]);

  useEffect(() => {
    const handleReceiveMessage = newData => {
      setChat(prevChat => [...prevChat, newData]);
    };

    const handleUserJoined = newData => {
      setChat(newData);
    };

    socket.on("sendMessage", handleReceiveMessage);
    socket.on("userJoined", handleUserJoined);
    return () => {
      socket.emit("leave", roomId);
      socket.off("sendMessage", handleReceiveMessage);
      socket.off("userJoined", handleUserJoined);
    };
  }, []);

  if (roomStatus === "loading") {
    return <div>loading...</div>;
  }
  if (roomStatus === "error") {
    return <div>error</div>;
  }
  return (
    <section className={styles.section}>


      <div className={styles.formWrap}>
        <div
          className={styles.chatForm}
          ref={chatFormRef}
          style={{ height: "500px" }}>
          {chat.map((message, i) => {
            let prevMessage;
            let timeDiff;
            if (i > 1) {
              prevMessage = chat[i - 1];
              const date1 = new Date(message.createdAt);
              const date2 = new Date(prevMessage.createdAt);
              timeDiff = date1.getMinutes() - date2.getMinutes();
            }

            if (userInfo.userId === message.userId) {
              return (
                <div
                  key={message.messageId}
                  className={`${styles.message} ${styles.mine}`}>
                  <div className={styles.isRead}>
                    {message.isRead === 1 ? "" : "안읽음"}
                  </div>
                  <div className={styles.mineContent}>
                    <div className={styles.myMessageInner}>
                      {message.message}
                    </div>
                  </div>
                </div>
              );
            } else if (
              i > 1 &&
              message.userId === prevMessage.userId &&
              timeDiff === 0
            ) {
              return (
                <div key={message.messageId} className={`${styles.message}`}>
                  <div className={styles.messageInner}>
                    <div className={styles.messageContent}>
                      <div className={styles.messageMsg}>{message.message}</div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message.messageId} className={`${styles.message}`}>
                  <div className={styles.profileBox}>
                    <img
                      className={styles.userImg}
                      src={message.sendUser.profileImage}
                      alt="profile"
                    />
                  </div>
                  <div className={styles.messageInner}>
                    <div className={styles.messageContent}>
                      <div className={styles.messageNickname}>
                        {message.sendUser.nickname}
                      </div>
                      <div className={styles.messageMsg}>{message.message}</div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <div ref={bottomRef}></div>
        </div>
        {isBottom ? null : (
          <div
            type="button"
            onClick={scrollToBottomSmooth}
            className={styles.toBottomBtn}>
            <img src={downImg} alt="scroll to bottom" />
          </div>
        )}
      </div>
      <form onSubmit={sendMessage} className={styles.inputForm}>
        <input name="message" autoComplete="off" />
        <Button variant="secondary btn-sm" type="submit">
          전송
        </Button>
      </form>
    </section>
  );
}

export default ChatRoom;
