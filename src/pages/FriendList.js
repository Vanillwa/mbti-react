import React, { useEffect, useState } from "react";
import styles from "../css/friend.module.css";
import { QueryClient, useMutation, useQuery } from "react-query";

import {
  acceptFriend,
  blockFriend,
  deleteFriend,
  getBlockUser,
  getFriend,
  getRequestFriend,
  rejectFriend,
  unblockUser,
} from "../service/api/friendAPI";

import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { requestChat } from "../service/api/chatAPI";
import sweetalert from "../component/sweetalert";
import { Form } from "react-bootstrap";
import Paging from "../component/Paging";

const FriendList = () => {
  const queryClient = new QueryClient();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [btn, setBtn] = useState("friend");
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);

  const {
    data: requestData,
    status: requestStatus,
    refetch,
  } = useQuery(["getRequestFriend", page, size], () => getRequestFriend( page, size), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: friendData,
    status: friendStatus,
    refetch: listRefetch,
  } = useQuery(
    ["getFriend", keyword, page, size],
    () => getFriend(keyword, page, size),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: blockData,
    status: blockStatus,
    refetch: blockRefetch,
  } = useQuery(["getBlockUser", page, size], () => getBlockUser( page, size), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const acceptMutate = useMutation((friendId) => {
    return acceptFriend(friendId);
  });
  const refuseMutate = useMutation((friendId) => {
    return rejectFriend(friendId);
  });
  const friendBlockMutate = useMutation((targetId) => {
    return blockFriend(targetId);
  });
  const deleteMutate = useMutation((friendId) => {
    return deleteFriend(friendId);
  });
  const releaseMutate = useMutation((userId) => {
    return unblockUser(userId);
  });

  const handleRequestAccept = async (friendId) => {
    acceptMutate.mutate(friendId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getFriend", "getRequestFriend"]);
        await listRefetch();
        await refetch();
        return;
      },
    });
  };

  const handleRequestRefuse = async (friendId) => {
    refuseMutate.mutate(friendId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getRequestFriend"]);
        await refetch();
        return;
      },
    });
  };

  const handleRequestBlock = async (friendId) => {
    const result = await sweetalert.question(
      "차단 할거야?",
      "",
      "네",
      "아니오"
    );

    if (result.dismiss) return;
    friendBlockMutate.mutate(friendId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getRequestFriend"]);
        sweetalert.success("차단 완료");
        await refetch();
        return;
      },
    });
  };
  const handleFriendBlock = async (targetId) => {
    const result = await sweetalert.question(
      "차단 할거야?",
      "",
      "네",
      "아니오"
    );
    if (result.dismiss) return;

    friendBlockMutate.mutate(targetId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getFriend"]);
        sweetalert.success("차단 완료");
        await listRefetch();
        return;
      },
    });
  };
  const handleReleaseUser = async (userId) => {
    const result = await sweetalert.question(
      "차단 해제 할거야?",
      "",
      "네",
      "아니오"
    );
    if (result.dismiss) return;
    releaseMutate.mutate(userId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getBlockUser", "getFriend"]);
        sweetalert.success("해제 완료");
        await listRefetch();
        await blockRefetch();
        return;
      },
    });
  };

  const handleFriendRefuse = async (friendId) => {
    const result = await sweetalert.question(
      "삭제 할거야?",
      "",
      "네",
      "아니오"
    );
    if (result.dismiss) return;
    deleteMutate.mutate(friendId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getFriend"]);
        await listRefetch();
        return;
      },
    });
  };

  const handleRequestChat = async (targetId) => {
    const result = await requestChat(targetId);
    if (result.message == "success" || result.message == "duplicated") {
      navigate(`/chat/list/${result.roomId}`);
    }
  };

  const handleBtnChange = (e) => {
    setBtn(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;

    setKeyword(keyword);
  };
  useEffect(()=>{
    setKeyword('')
  },[btn])
  console.log(btn)
  if (
    requestStatus === "loading" ||
    friendStatus === "loading" ||
    blockStatus === "loading"
  ) {
    return <div>Loding...</div>;
  } else if (
    requestStatus === "error" ||
    friendStatus === "error" ||
    blockStatus === "error"
  ) {
    return <div>Error...</div>;
  }
  if (!isLoggedIn) {
    return (
      <>
        <h3>로그인 후 이용해주세요</h3>
        <Link to="/">로그인 하러가기</Link>
      </>
    );
  }

  console.log(friendData);

  return (
    <div className={styles.body}>
      <Form className={styles.radioBox} onChange={handleBtnChange}>
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            value="friend"
            inline
            type="radio"
            label="친구 목록"
            name="group1"
            id={`inline-1`}
            defaultChecked
          />
          <Form.Check
            inline
            value="request"
            type="radio"
            label="요청 목록"
            name="group1"
            id={`inline-2`}
          />
          <Form.Check
            inline
            value="block"
            type="radio"
            name="group1"
            label="차단 목록"
            id={`inline-3`}
          />
        </div>
      </Form>
      {btn == "friend" ? (
        <div className={styles.container}>
          <form onSubmit={handleSearch}>
            <input
              className={styles.search}
              name="keyword"
              placeholder="검색"
            />
          </form>
          <div className={styles.title}>친구 목록</div>
          {friendData.result.length > 0 ? (
            friendData.result.map((item) => {
              return (
                <div key={item.friendId} className={styles.contentBox}>
                  <Link
                    to={`/user/${item.receiveUser.userId}`}
                    className={styles.friendName}
                  >
                    {item.receiveUser.nickname}
                  </Link>
                  <div className={styles.btnBox}>
                    <div
                      onClick={() => handleRequestChat(item.receiveUser.userId)}
                      type="button"
                      className={`${styles.button} ${styles.chatBtn}`}
                    >
                      채팅하기
                    </div>
                    <div
                      type="button"
                      className={`${styles.button} ${styles.blockBtn}`}
                      onClick={() => handleFriendBlock(item.receiveUser.userId)}
                    >
                      너 차단
                    </div>
                    <div
                      type="button"
                      className={`${styles.button} ${styles.delBtn}`}
                      onClick={() => handleFriendRefuse(item.friendId)}
                    >
                      너 삭제
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.friendListContent}>친구 없음 ㅋㅋ..</div>
          )}
        </div>
      ) : btn == "request" ? (
        <div className={styles.container}>
          <div className={styles.title}>친구 요청 목록</div>
          {requestData.result.length > 0 ? (
            requestData.result.map((item) => {
              return (
                <div key={item.friendId} className={styles.contentBox}>
                  <Link to={`/user/${item.requestUser.userId}`}>
                    {item.requestUser.nickname}
                  </Link>
                  <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                  <div className={styles.btnBox}>
                    <div
                      type="button"
                      className={styles.button}
                      onClick={() => handleRequestAccept(item.friendId)}
                    >
                      수락
                    </div>
                    <div
                      type="button"
                      className={styles.button}
                      onClick={() => handleRequestRefuse(item.friendId)}
                    >
                      거절
                    </div>
                    <div
                      type="button"
                      className={styles.button}
                      onClick={handleRequestBlock}
                    >
                      너 차단
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.requestBox}>요청 없음</div>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>차단 목록</div>
          {blockData.result.length > 0 ? (
            blockData.result.map((item) => {
              return (
                <div key={item.friendId} className={styles.contentBox}>
                  <div className={styles.nickname}>
                    {item.receiveUser.nickname}
                  </div>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleReleaseUser(item.targetId)}
                  >
                    차단 해제
                  </button>
                </div>
              );
            })
          ) : (
            <div className={styles.BlockBox}>차단한 유저 없음</div>
          )}
        </div>
      )}
      <div>
      {btn == "friend" ? (
        friendData.result.length > 0 ?
        <Paging
          data={friendData}
          status={friendStatus}
          page={page}
          setPage={setPage}
        /> : null
      ) : btn == "request" ? (
        requestData.result.length > 0 ?
        <Paging
          data={requestData}
          status={requestStatus}
          page={page}
          setPage={setPage}
        />
        : null
      ) : btn == "block" ? (
        blockData.result.length > 0 ?
        <Paging
          data={blockData}
          status={blockStatus}
          page={page}
          setPage={setPage}
        />
        : null
      ) : null}
      </div>
    </div>
  );
};

export default FriendList;
