import React from "react";
import styles from "../css/Chat.module.css";
import { useQuery } from "react-query";
import { getChatList } from "../service/api/chatAPI";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { socket } from "../service/socket/socket";
const ChatList = () => {
  const { data, status, refetch } = useQuery(
    ["getChatList"],
    () => getChatList(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  socket.on("notification", async () => {
    await refetch();
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
  if (!isLoggedIn || userInfo.userId == null) {
    return (
      <>
        <h2> 로그인 후 이용해주세요</h2>
        <Link to="/" style={{ color: "blue" }}>
          로그인 하러가기
        </Link>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h2>채팅목록</h2>
        <div className={styles.chatBox}>
          <div className={styles.chatItems}>
            {data.map((item) => {
              return (
                <Link
                  to={`/chat/list/${item.roomId}`}
                  className={styles.itemBox}
                  key={item.roomId}
                >
                  {userInfo.userId == item.user1.userId ? (
                    <>
                      <div className={styles.userBox}>
                        <div className={styles.imgBox}>
                          <img
                            className={styles.userImg}
                            src={item.user2.profileImage}
                          />
                        </div>
                        <div className={styles.contentBox}>
                          <div className={styles.nickname}>{item.user2.nickname}</div>
                          <div className={styles.messageBox}>
                            <span>{item.recentMessage}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.userBox}>
                        <div className={styles.imgBox}>
                          <img
                            className={styles.userImg}
                            src={item.user2.profileImage}
                          />
                        </div>
                        <div className={styles.contentBox}>
                          <div className={styles.nickname}>{item.user1.nickname}</div>
                          <div className={styles.messageBox}>
                            <span>{item.recentMessage}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className={styles.numBox}>
                    <div
                      className={
                        item.unreadCount > 0 ? styles.unreadNum : styles.readNum
                      }
                    >
                      <div>
                        {item.unreadCount > 0 ? item.unreadCount : null}
                      </div>
                    </div>
                  </div>
                </Link>
              );

            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
