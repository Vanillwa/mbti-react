import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const fetchLogin = async (body) => {
  const res = await axios.post("/login", body);
  return res.data;
};

export const checkDuplicationEmail = async (body) => {
  const res = await axios.post("/checkDuplicationEmail", body);
  return res.data;
};

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


