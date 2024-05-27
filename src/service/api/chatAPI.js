import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;


// 채팅 요청
export const requestChat = async (targetId) => {
  const res = await axios.get(`/chat/request?targetId=${targetId}`);
  return res.data;
};

// 채팅 리스트
export const getChatList = async () => {
  const res = await axios.get(`/chat`);
  return res.data;
};


//채팅방 입장
export const getChatRoom = async (roomId) => {
  const res = await axios.get(`/chat/join/${roomId}`);
  return res.data;
};

//채팅방 나가기
export const quitChatRoom = async (roomId) => {
  const res = await axios.get(`/chat/quit/${roomId}`);
  return res.data;
};