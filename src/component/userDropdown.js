import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { requestChat } from "../service/api/chatAPI";

import styles from "../css/PostList.module.css";
import { requestFriend } from "../service/api/friendAPI";
import sweetalert from "./sweetalert";
import { socket } from "../service/socket/socket";
import { Dropdown, DropdownButton } from "react-bootstrap";

const UserDropdown = ({ item }) => {
  const navigate = useNavigate();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [friend, setFriend] = useState("");

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleRequestChat = async (e, targetId) => {
    e.preventDefault();
    const result = await requestChat(targetId);

    if (result.message === "success") {
      navigate(`/chat/list/${result.roomId}`);
    } else if (result.message === "noAuth") {
      sweetalert.warning("로그인이 필요한 서비스입니다.");
    } else if (result.message === "notFriend") {
      sweetalert.warning("친구가 아닙니다.");
    } else if (result.message === "duplicated") {
      navigate(`/chat/list/${result.roomId}`);
    }
  };

  const handleRequestFreind = async (e, userId) => {
    e.preventDefault();
    const result = await requestFriend(userId);

    if (result.message == "success") {
      setFriend("친구 요청 완료");
      socket.emit(`friendRequest`, userId);
      sweetalert.success("친구 요청 완료", "", "확인");
    } else if (result.message == "duplicated") {
      setFriend("이미 친구임.");
      sweetalert.warning("이미 친구임.", "", "확인");
    } else if (result.message == "blocked") {
      setFriend("차단한 친구임.");
      sweetalert.warning("차단한 친구임.", "", "확인");
    } else if (result.message == "pending") {
      setFriend("이미 요청한 친구임.");
      sweetalert.warning("이미 요청한 친구임.", "", "확인");
    }
    setOpenDropdownId(null);
  };
  const handleDropdownClick = (e, id) => {
    e.preventDefault();

    if (openDropdownId === id) {
      setOpenDropdownId(null); // 이미 열린 드롭다운을 닫습니다.
    } else {
      setOpenDropdownId(id); // 새로운 드롭다운을 엽니다.
    }
  };
  return (
    <>
      <div className={`${styles.userBox} col-8`}  >
        <div className={styles.profileBox}>
          <img
            src={item.profileImage}
            alt="profile"
            className={styles.profileImg}
          />
          <div className={styles.nicknameBox}>
            <div className={styles.nickname}>{item.nickname}</div>
            <div className={styles.mbti}>{item.mbti}</div>
          </div>
        </div>
        {userInfo?.userId == item.userId ? null : (
          <>
            <div
              type="button"
              onClick={(e) => handleDropdownClick(e, item.userId)}
              className={styles.userInfoBtn}
            >
              <DropdownButton title="title" variant="Secondary">
                <Dropdown.ItemText><Link to={`/user/${item.userId}`}>프로필 보기</Link></Dropdown.ItemText>
                {isLoggedIn ?<><Dropdown.Item as="button"><li>
                    <div
                      type="button"
                      onClick={(e) => {
                        handleRequestFreind(e, item.userId);
                      }}
                    >
                      친구요청
                    </div>
                  </li></Dropdown.Item>
                <Dropdown.Item as="button"><li>
                    <div
                      type="button"
                      onClick={(e) => {
                        handleRequestChat(e, item.userId);
                      }}
                    >
                      채팅하기
                    </div>
                  </li></Dropdown.Item>
                <Dropdown.Item as="button"><li>
                    <div type="button">차단하기</div>
                  </li></Dropdown.Item></> : null}
                
              </DropdownButton>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDropdown;
