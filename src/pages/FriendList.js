import React from "react";
import styles from "../css/friend.module.css";
import { useQuery } from "react-query";
import { acceptFriend, blockFriend, getFriend, getRequestFriend, rejectFriend } from "../service/api";
import { useAuthContext } from "../context/AuthContext";
import { Link} from "react-router-dom";

const FriendList = () => {
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  
  const { data : requestData,  status : requestStatus , refetch} = useQuery(
    ["getRequestFriend"],
    () => getRequestFriend(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data : friendData, status : friendStatus} = useQuery(
    ['getFriend'],()=> getFriend(),
    {
      retry:false,
      refetchOnWindowFocus: false,
    }
  )
  


  const handleRequestAccept = async(friendId)=>{
    const result = await acceptFriend(friendId)
    if(result.message == "success"){
      alert('수락했음.')
      refetch()
    }
  }

  const handleRequestRefuse = async(friendId)=>{
    const result = await rejectFriend(friendId)
    if(result.message == "success"){
      alert('거절헀음.')
      refetch()
    }
  }

  const handleRequestBlock = ()=>{
    
  }
  const handleFriendBlock = async(friendId)=>{
    window.confirm('정말 차단하시겠습니까?')
    const result = await blockFriend(friendId)
    if(result.message == "success"){
      alert('차단 완료')
      refetch()
    }
  }
  const handleFriendRefuse = async(friendId)=>{

  }


  if (requestStatus === "loading" || friendStatus === "loading") {
    return <div>Loding...</div>;
  } else if (requestStatus === "error" || friendStatus === "error") {
    return <div>Error...</div>;
  }
  if(!isLoggedIn){
    return(<><h3>로그인 후 이용해주세요</h3><Link to='/'>로그인 하러가기</Link></>)
  }


  console.log(friendData)

  return (
    <>
      <div className={styles.friendList}>
        <div className={styles.friendListTitle}>친구 목록</div>
        {friendData.length > 0 ? friendData.map((item)=>{
          return(<div key={item?.id} className={styles.friendListContent}>
            <Link to={`/user/${item.receiveUser.userId}`} className={styles.friendName}>
              {item.receiveUser.nickname}
            </Link>
            <div className={styles.btnBox}>
              <Link to={`/chat/list/${item.roomId}`}><div type='button' className={styles.button}>채팅하기</div></Link>
            <div type='button' className={styles.button} onClick={()=>handleFriendBlock(friendData.friendId)}>너 차단</div>
            <div type='button' className={styles.button} onClick='handleFriendRefuse'>너 삭제</div>

            </div>

            </div>)
          
        }) : <div className={styles.friendListContent}>친구 없음 ㅋㅋ..</div>}
      </div>
      <div className={styles.friendRequest}>
        <div className={styles.friendRequestTitle}>친구 요청 목록</div>
      {requestData.length > 0 ? requestData.map((item) => {
          return (
            <div key={item.id} className={styles.requestBox}>
              <Link to={`/user/${item.requestUser.userId}`}>{item.requestUser.nickname}</Link>
              <div>{new Date (item.createdAt).toLocaleDateString()}</div>
              <div className={styles.btnBox}>
                <div type='button' className={styles.button} onClick={()=>handleRequestAccept(item.friendId)}>수락</div>
                <div type='button' className={styles.button} onClick={()=>handleRequestRefuse(item.friendId)}>거절</div>
                <div type='button' className={styles.button} onClick={handleRequestBlock}>너 차단</div>
              </div>
            </div>
          );
        }) : <div  className={styles.requestBox} >요청 없음</div>}
      </div>
      <div className={styles.friendBlock}></div>
    </>
  );
};

export default FriendList;
