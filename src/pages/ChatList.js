import styles from "../css/ChatList.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ChatReportModal from "../component/ChatReportModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { socket } from "../service/socket/socket";

const ChatList = ({ listData, listStatus, listRefetch, setRoomId, roomId }) => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const handleSetRoomId = (roomId) => {
    console.log("roomId", roomId)
    setRoomId((preRoomId => {
      if (preRoomId != null) socket.emit("leaveRoom", preRoomId)
      return roomId
    }));
  };

  if (listStatus === "loading") {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (listStatus === "error") {
    return (
      <div className="container">
        <h1>error!</h1>
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
    <div className={`${styles.listInner}`}>
      <div className={styles.itemWrap}>
        {listData.length === 0 ? <div className={styles.noList}>개설된 채팅방이 없습니다</div> : listData.map(item => {
          return (
            <div onClick={() => { handleSetRoomId(item.roomId); }} className={roomId === item.roomId ? `${styles.selectedItem} ${styles.item}` : styles.item} key={item.roomId}>
              <div className={styles.userBox}>
                <div className={styles.imgBox}>
                  <img className={styles.userImg} src={userInfo.userId === item.user1.userId ? item.user2.profileImage : item.user1.profileImage} alt="profile" />
                </div>
                <div className={styles.contentBox}>
                  <div className={styles.nickname}>{userInfo.userId === item.user1.userId ? item.user2.nickname : item.user1.nickname}</div>
                  <div className={styles.messageBox}>{item.recentMessage}</div>
                </div>
              </div>
              <div className={styles.numBox}>
                <div className={item.unreadCount > 0 ? styles.unreadNum : styles.readNum}>
                  <div>{item.unreadCount > 0 ? item.unreadCount : null}</div>
                </div>
              </div>
            </div>

          );
        })}
      </div>

      <Swiper
        className={styles.swiper}
        slidesPerView={6} //한번에 보여질 갯수
        breakpoints={{
          600: {
            slidesPerView: 6, // 4 slides per view on screens >= 768px
          },
          500: {
            slidesPerView: 5,
          },
          400: {
            slidesPerView: 4,
          },
          0: {
            slidesPerView: 3, // 1 slide per view on screens >= 320px
          },

        }}>
        {listData.map(item => {
          return (
            <SwiperSlide onClick={() => { handleSetRoomId(item.roomId); }} className={roomId === item.roomId ? `${styles.selectedItem} ${styles.item}` : styles.item} key={item.roomId}>

              <div className={styles.imgBox}>
                <img className={styles.userImg} src={userInfo.userId === item.user1.userId ? item.user2.profileImage : item.user1.profileImage} alt="profile" />
                <div className={styles.numBox}>
                <div className={item.unreadCount > 0 ? styles.unreadNum : styles.readNum}>
                  <div>{item.unreadCount > 0 ? item.unreadCount : null}</div>
                </div>
              </div>
              </div>
              <div className={styles.nickname}>{userInfo.userId === item.user1.userId ? item.user2.nickname : item.user1.nickname}</div>
              {/* {item.recentMessage === null ? null :
                <div className={styles.chatReportModal}>
                  <ChatReportModal roomId={roomId} />
                </div>
              } */}

              

            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ChatList;
