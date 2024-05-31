import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../css/ChatRoom.module.css";
import { getChatRoom, quitChatRoom } from "../service/api/chatAPI";
import { useAuthContext } from "../context/AuthContext";
import downImg from "../svg/arrow-down-circle.svg";

import ChatReportModal from "../component/ChatReportModal";
import { ReactComponent as ThreeDots } from "../svg/three-dots.svg"
import { Dropdown } from "react-bootstrap";
import sweetalert from "../component/sweetalert";
function ChatRoom({ roomId, setRoomId, listRefetch }) {

  const { memoUserInfo, socket } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const [isBottom, setIsBottom] = useState(true);
  const [chat, setChat] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const chatFormRef = useRef();
  const bottomRef = useRef();
  const { data: roomData, status: roomStatus, refetch: roomRefetch } = useQuery(
    ["getChatRoom", roomId],
    () => getChatRoom(roomId),
    {
      enabled: !!roomId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: async (roomData) => {
        socket.emit("joinRoom", roomId);
        setChat(roomData.messageList);
        await listRefetch()
      },
    }
  );

  const sendMessage = e => {
    e.preventDefault();
    setIsBottom(true);
    let message = e.target.message.value;
    if (message === "") return;
    let targetId = userInfo.userId === roomData.roomInfo.userId1 ? roomData.roomInfo.userId2 : roomData.roomInfo.userId1
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
      listRefetch();
    };

    const handleUserJoined = (newData) => {
      if (newData === userInfo.userId) {
        roomRefetch()
        listRefetch()
      }
    };

    const handleNotAvailable = (newData) => {
      if (newData.targetId === userInfo.userId) {
        sweetalert.warning("상대방이 채팅이 불가능한 상태입니다.", "", "확인");
      }
    }

    socket.on("sendMessage", handleReceiveMessage);
    socket.on("userJoined", handleUserJoined);
    socket.on("notAvailable", handleNotAvailable)
    socket.on("quitRoom", (newData) => {
      if (newData === userInfo.userId) roomRefetch()
    })
    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
    </a>
  ));

  const handleQuit = async () => {
    const result = await quitChatRoom(roomId)
    if (result.message === 'success') {
      listRefetch()
      setRoomId(null)
    }
    await socket.emit("quitRoom", roomData.roomInfo)
  }

  if (roomStatus === "loading") {
    return <div>loading...</div>;
  }
  if (roomStatus === "error") {
    return <div>error</div>;
  }
  return (
    <section className={styles.section}>
      <div className={styles.chatForm} ref={chatFormRef}>
        <div className={styles.chatFormInner}>

          {chat.length === 0 ? <div className={styles.noMessage}>아직 채팅이 없습니다.</div> : chat.map((message, i) => {
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
                <div key={message.messageId} className={`${styles.chat} ${styles.mine}`}>
                  <div className={styles.isRead}>
                    {message.isRead === 1 ? "" : "안읽음"}
                  </div>
                  <div className={styles.content}>{message.message}</div>
                </div>
              );
            } else if (
              i > 1 &&
              message.userId === prevMessage.userId &&
              timeDiff === 0
            ) {
              return (
                <div key={message.messageId} className={`${styles.chat} ${styles.continueChat}`}>
                  <div style={{ width: "40px" }}></div>
                  <div className={styles.continueContent}>{message.message}</div>
                </div>
              );
            } else {
              return (
                <div key={message.messageId} className={`${styles.chat}`}>
                  <div className={styles.profileBox}>
                    <img className={styles.userImg} src={message.sendUser.profileImage} alt="profile" />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.yourNickname}>{message.sendUser.nickname}</div>
                    <div className={styles.yourContent}>{message.message}</div>
                  </div>
                </div>
              );
            }
          })}
          {roomData.roomInfo.user1Status === 'quit' || roomData.roomInfo.user2Status === 'quit' ? <div className={styles.quitAlert}>상대방이 채팅방을 나갔습니다.</div> : null}
          <div ref={bottomRef}></div>
        </div>
        {isBottom ? null : (
          <div type="button" onClick={scrollToBottomSmooth} className={styles.toBottomBtn}>
            <img src={downImg} alt="scroll to bottom" />
          </div>
        )}
      </div>

      <div className={styles.bottom}>
        <form onSubmit={sendMessage} className={styles.inputForm}>
          <input name="message" autoComplete="off" />
          <Button variant="secondary btn-sm" type="submit">
            전송
          </Button>
        </form>
        <Dropdown >
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <ThreeDots width='24px' height='24px' />
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item eventKey="1"><ChatReportModal roomId={roomId} setRoomId={setRoomId} listRefetch={listRefetch} roomData={roomData} /></Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleQuit}>나가기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </section>
  );
}

export default ChatRoom;
