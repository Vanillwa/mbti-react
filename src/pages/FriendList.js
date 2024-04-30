import React from "react";
import styles from "../css/friend.module.css";
import { useQuery } from "react-query";
import { getFriend, getRequestFriend } from "../service/api";
import { useAuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const FriendList = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const { data, status } = useQuery(
    ["getRequestFriend"],
    () => getRequestFriend(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  

  const handleRequestAccept = ()=>{

  }

  const handleRequestRefuse =()=>{

  }

  const handleRequestBlock = ()=>{

  }


  if (status === "loading") {
    return <div>Loding...</div>;
  } else if (status === "error") {
    return <div>Error...</div>;
  }
  console.log(data);


  return (
    <>
      <div className={styles.friendList}>
        
      </div>
      <div className={styles.friendRequest}>
      {data.length > 0 ? data.map((item) => {
          return (
            <div className={styles.requestBox}>
              <div>{item.requestUser.nickname}</div>
              <div>{item.createdAt}</div>
              <div>
                <div onClick={()=>handleRequestAccept(item.friendId)}></div>
                <div onClick={handleRequestRefuse}></div>
                <div onClick={handleRequestBlock}></div>
              </div>
            </div>
          );
        }) : <></>}
      </div>
      <div className={styles.friendBlock}></div>
    </>
  );
};

export default FriendList;
