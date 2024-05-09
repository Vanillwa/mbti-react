import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { requestChat, requestFriend } from "../service/api/api";
import styles from "../css/PostList.module.css";

const UserDropdown = ({ item }) => {
const navigate =  useNavigate();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const [friend, setFriend] = useState("");

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleRequestChat = async(targetId)=>{
    const result = await requestChat(targetId);
    
    if(result.message ==="success"){
      navigate(`/chat/list/${result.roomId}`)
    }else if(result.message ==="noAuth"){
      alert("로그인이 필요한 서비스입니다.")
    }else if(result.message ==="notFriend"){
      alert("친구가 아닙니다.")
    }else if(result.message ==="duplicated"){
      navigate(`/chat/list/${result.roomId}`)
    }
  }

  const handleRequestFreind = async (userId) => {
    const result = await requestFriend(userId);

    if (result.message == "success") {
      setFriend("친구 요청 완료");
      alert("친구 요청 완료");
    } else if (result.message == "duplicated") {
      setFriend("이미 친구임.");
      alert("이미 친구임.");
    } else if (result.message == "blocked") {
      setFriend("차단한 친구임.");
      alert("차단한 친구임.");
    } else if (result.message == "pending") {
      setFriend("이미 요청한 친구임.");
      alert("이미 요청한 친구임.");
    }
    setOpenDropdownId(null)
  };
  const handleDropdownClick = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null); // 이미 열린 드롭다운을 닫습니다.
    } else {
      setOpenDropdownId(id); // 새로운 드롭다운을 엽니다.
    }
  };

  return (
    <>
      <div className={`${styles.userBox}`}>
        <div>
          <img
            src={item.User.profileImage}
            alt="profile"
            className={styles.profileImg}
          />
          <span className={styles.nickname}>{item.User.nickname}</span>
        </div>
        {userInfo?.userId == item.User.userId ? null : <>
          <div type="button"
          onClick={() => handleDropdownClick(item.User.userId)}
          className={styles.userInfoBtn}
        >
          {openDropdownId ? "▲" : "▼"}
        </div>
        <ul className={!openDropdownId ? styles.dropdown : styles.dropdownOpen}>
          <li>
            <Link to={`/user/${item.User.userId}`}>프로필 보기</Link>
          </li>
          {isLoggedIn ? <>
            <li>
            <div
              type="button"
              onClick={() => handleRequestFreind(item.User.userId)}
            >
              친구요청
            </div>
          </li>
          <li>
            <div type="button" onClick="">
              차단하기
            </div>
          </li>
          <li>
            <div type="button" onClick={()=>handleRequestChat(item.User.userId)}>
              채팅하기
            </div>
          </li>
          </> : null}
        </ul></>}
        
      </div>
    </>
  );
};

export default UserDropdown;
