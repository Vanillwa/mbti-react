import React from "react";
import styles from "../css/friend.module.css";
import { QueryClient, useMutation, useQuery } from "react-query";
import { acceptFriend, blockFriend, deleteFriend, getFriend, getRequestFriend, rejectFriend, requestChat } from "../service/api";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate} from "react-router-dom";

const FriendList = () => {
  const queryClient = new QueryClient()
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const navigate = useNavigate()

  const { data : requestData,  status : requestStatus , refetch} = useQuery(
    ["getRequestFriend"],
    () => getRequestFriend(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data : friendData, status : friendStatus, refetch : listRefetch} = useQuery(
    ['getFriend'],()=> getFriend(),
    {
      retry:false,
      refetchOnWindowFocus: false,
    }
  )
  const  acceptMutate = useMutation(friendId=>{
    return acceptFriend(friendId)
  })
  const refuseMutate = useMutation(friendId=>{
    return rejectFriend(friendId)
  })
  const friendBlockMutate = useMutation(friendId=>{
    return blockFriend(friendId)
  })
  const deleteMutate = useMutation(friendId=> {
    return deleteFriend(friendId)
  })
  


  const handleRequestAccept = async(friendId)=>{

    acceptMutate.mutate(friendId, {
      onSuccess:async()=>{
        
        await queryClient.invalidateQueries(['getFriend','getRequestFriend'])
        await listRefetch()
        await refetch()
        return
      }
    })
  }

  const handleRequestRefuse = async(friendId)=>{
    refuseMutate.mutate(friendId, {
      onSuccess:async()=>{
        await queryClient.invalidateQueries(['getRequestFriend'])
        await refetch()
        return
      }
    })
  }

  const handleRequestBlock = (friendId)=>{
    friendBlockMutate.mutate(friendId,{
      onSuccess : async()=>{
        await queryClient.invalidateQueries(['getRequestFriend'])
        await refetch()
        return
      }
    })
  }
  const handleFriendBlock = (friendId)=>{
    friendBlockMutate.mutate(friendId,{
      onSuccess : async()=>{
        await queryClient.invalidateQueries(['getRequestFriend'])
        await refetch()
        return
      }
    })
  }

  const handleFriendRefuse = async(friendId)=>{
    deleteMutate.mutate(friendId,{
      onSuccess : async()=>{
        await queryClient.invalidateQueries(['getFriend'])
        await listRefetch()
        return
      }
    })
  }

  const handleRequestChat = async(targetId)=>{
    const result = await requestChat(targetId)
    if(result.message == "success" || result.message == 'duplicated'){
      navigate(`/chat/list/${result.roomId}`)
    }
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
          return(<div key={item.friendId} className={styles.friendListContent}>
            <Link to={`/user/${item.receiveUser.userId}`} className={styles.friendName}>
              {item.receiveUser.nickname}
            </Link>
            <div className={styles.btnBox}>
              <div onClick={()=>handleRequestChat(item.receiveUser.userId)} type='button' className={styles.button}>채팅하기</div>
            <div type='button' className={styles.button} onClick={()=>handleFriendBlock(item.friendId)}>너 차단</div>
            <div type='button' className={styles.button} onClick={()=>handleFriendRefuse(item.friendId)}>너 삭제</div>

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
