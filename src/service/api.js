import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const fetchLogin = async (body) => {
  const res = await axios.post("/login", body);
  return res.data;
};


export const checkDuplicationEmail = async (body)=>{
  const res = await axios.post("/join/checkDuplicationEmail", body)
  return res.data
}


export const checkDuplicationNickname = async (body)=>{
  const res = await axios.post("/join/checkDuplicationNickname", body)
  return res.data
}


export const fetchJoin = async (body) => {
  const res = await axios.post("/join", body);
  return res.data;
};

export const fetchLogout = async () => {
  const res = await axios.get("/logout");
  return res.data;
};

export const getUserList = async () => {
  const res = await axios.get("/user");
  return res.data;
};

export const requestChat = async (targetId) => {
  const res = await axios.get(`/chat/request?targetId=${targetId}`);
  return res.data;
};

export const getChatList = async () => {
  const res = await axios.get("/chat");
  return res.data;
};

export const getMessage = async (roomId) => {
  const res = await axios.get(`/chat/${roomId}`);
  return res.data;
};

export const getPostList = async (mbti) => {
  const res = await axios.get(`/post/list?mbti=${mbti}`);
  return res.data;
};

export const getPostView = async (postId) => {
  const res = await axios.get(`/post/${postId}`);
  return res.data;
};

export const getPostByUserId = async (userId) =>{
  const res = await axios.get(`/user/${userId}`)
  return res.data;
}



//인증 번호 확인을 위한 api
export const checkEmailVerification = async (code) => {
  const res = await axios.post("/join/checkEmailVerification", {code});
  return res.data;
};

// join.js

// 인증번호 발송을 위한 api
export const requestEmailVerification = async (email) => {
  const res = await axios.post("/join/requestEmailVerification", { email });
  return res.data;
};

// 회원가입 이메일 값 변경시 세션 삭제 api 
export const emailChanged = async()=>{
  const res = await axios.get("/join/emailChanged")
  return res.data;
}

// 회원가입 닉네임 값 변경시 세션 삭제 api
export const nickNameChanged = async()=>{
  const res = await axios.get("/join/nickNameChanged")
  return res.data;
}


// MemberRevise.js

// 현재 로그인된 유저 정보 받는 api
export const loginStatus = async(id)=>{
  const res = await axios.get(`/api/user/${id}`);
  return res.data;
}










export const requestCodeFindPwd = async (email)=>{
  const res = await axios.post("/findPassword/requestEmailVerification",{email})
  return res.data;
}

export const checkCodeFindPwd = async(verifyNumber)=>{
  const res= await axios.post("/findPassword/checkEmailVerification",{verifyNumber})
  return res.data;
}




