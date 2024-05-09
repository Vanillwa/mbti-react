import axios from "axios";

// import https from "https";
// axios.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized:false
// });

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const fetchLogin = async (body) => {
  const res = await axios.post("/login", body);
  return res.data;
};



export const fetchLogout = async () => {
  const res = await axios.get("/logout");
  return res.data;
};

export const getUserList = async (filter,keyword,type,page,size) => {
  console.log("page :",page ,"size:",size)
  const res = await axios.get(`/user?filter=${filter}&keyword=${keyword}&type=${type}&page=${page}&size=${size}`);
  return res.data;
};
// 채팅 요청
export const requestChat = async (targetId) => {
  const res = await axios.get(`/chat/request?targetId=${targetId}`);
  return res.data;
};
// 채팅 리스트
export const getChatList = async () => {
  const res = await axios.get("/chat");
  return res.data;
};


//채팅방
export const getChatRoom = async (roomId) => {
  const res = await axios.get(`/chat/${roomId}`);
  return res.data;
};

export const getPostList = async (mbti, size, sort, order, page) => {
  const res = await axios.get(`/post/list?mbti=${mbti}&size=${size}&sort=${sort}&order=${order}&page=${page}`);
  return res.data;
};

export const getPostView = async (postId) => {
  const res = await axios.get(`/post/${postId}`);
  return res.data;
};

export const getPostByUserId = async (userId) => {
  const res = await axios.get(`/user/${userId}`);
  return res.data;
};



// MemberRevise.js





//비밀번호 찾기 이메일 인증

export const requestCodeFindPwd = async (email) => {
  const res = await axios.post("/updatePassword/requestEmailVerification", {
    email,
  });
  return res.data;
};

export const checkCodeFindPwd = async (verifyNumber) => {
  const res = await axios.post("/updatePassword/checkEmailVerification", {
    verifyNumber,
  });
  return res.data;
};

export const emailChangedFindPwd = async () => {
  const res = await axios.get("/updatePassword/emailChanged");
  return res.data;
};
//비밀번호 재설정하기
export const requestUpdatePwd = async (password) => {
  const res = await axios.post("/updatePassword", { password });
  return res.data;
};
/**글작성 */
export const postPost = async (body) => {
  const res = await axios.post("/post", body);
  return res.data;
};
/**글삭제 */
export const postDelete = async (postId) => {
  const res = await axios.delete(`/post/${postId}`);
  return res.data;
};
/**글 수정 */
export const postEdit = async (body) => {
  const res = await axios.put("/post", body);
  return res.data;
};

/** 댓글 조회 */
export const getViewComment = async (postId, page, size, order) => {
  const res = await axios.get(`/comment?postId=${postId}&page=${page}&size=${size}&order=${order}`);
  return res.data;
};
/** 댓글 작성 */
export const postViewComment = async (body) => {
  const res = await axios.post(`/comment`, body);
  return res.data;
};
/**댓글 삭제 */
export const deleteViewComment = async (commentId) => {
  const res = await axios.delete(`/comment/${commentId}`);
  return res.data;
};
/**댓글 수정 */
export const EditViewComment = async (body) => {
  const res = await axios.put(`/comment/${body.commentId}`, body);
  return res.data;
};

/**좋아요 누름*/
export const ClickPostLikes = async (postId) => {
  const res = await axios.get(`/addLike/${postId}`);
  return res.data;
};

/**친구 요청 기능 */
export const requestFriend = async (targetId) => {
  const res = await axios.get(`/friend/request?targetId=${targetId}`);
  return res.data;
};
/**친구 조회 */
export const getFriend = async ()=>{
  const res = await axios.get(`friend/friendList`)
  return res.data
}
/**친구 요청 조회 */
export const getRequestFriend  =async()=>{
  const res = await axios.get(`/friend/requestList`)
  return res.data
}
/**차단 유저 조회 */
export const getBlockUser  =async()=>{
  const res = await axios.get(`/friend/blockList`)
  return res.data
}
/**친구 요청 수락 */
export const acceptFriend = async (friendId)=>{
  const res = await axios.get(`/friend/accept?friendId=${friendId}`)
  return res.data
}

//신고하기
export const PostReport = async (body) =>{
  const res = await axios.post("/post/report",body)
  return res.data;
}

/**친구 요청 거절 */
export const rejectFriend = async (friendId)=>{
  const res = await axios.delete(`/friend/reject?friendId=${friendId}`)
  return res.data
}
/** 친구 차단 */
export const blockFriend = async (friendId)=>{
  const res = await axios.put(`/friend/block?friendId=${friendId}`)
  return res.data
}
/**친구 삭제 */
export const deleteFriend = async(friendId)=>{
  const res = await axios.delete(`friend/delete?friendId=${friendId}`)
  return res.data
}

//신고목록
export const getPostReportList = async ()=>{
  const res = await axios.get("/report/post")
  return res.data;

}
//신고처리
export const updatePostReport = async (reportId)=>{
  const res = await axios.put(`/report/post/${reportId}`)
  return res.data;
}
//계정정지
export const suspendUser = async(postId,userId,blockDate)=>{
  const res = await axios.put(`/user/block?postId=${postId}&userId=${userId}&blockDate=${blockDate}`)
  return res.data;
}
//차단해제
export const releaseUser = async(userId)=>{
  const res =await axios.put(`/user/unblock?userId=${userId}`)
  return res.data;
}



// 유저 최신글 조회 

export const getProfileList = async (userId)=>{
  const res =  await axios.get(`/user/${userId}`)
  return res.data;
}



