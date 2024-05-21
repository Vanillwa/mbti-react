import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

/**친구 요청 기능 */
export const requestFriend = async (targetId) => {
  const res = await axios.get(`/friend/request?targetId=${targetId}`);
  return res.data;
};
/**친구 조회 */
export const getFriend = async (keyword, page, size)=>{
  const res = await axios.get(`/friend/friendList?keyword=${keyword}&page=${page}&size=${size}`)
  return res.data
}
/**친구 요청 조회 */
export const getRequestFriend  =async(page, size)=>{
  const res = await axios.get(`/friend/requestList?page=${page}&size=${size}`)
  return res.data
}
/**차단 유저 조회 */
export const getBlockUser  =async(page, size)=>{
  const res = await axios.get(`/friend/blockList?page=${page}&size=${size}`)
  return res.data
}
/**친구 요청 수락 */
export const acceptFriend = async (friendId)=>{
  const res = await axios.get(`/friend/accept?friendId=${friendId}`)
  return res.data
}

/**친구 요청 거절 */
export const rejectFriend = async (friendId)=>{
  const res = await axios.delete(`/friend/reject?friendId=${friendId}`)
  return res.data
}
/** 친구 차단 */
export const blockFriend = async (targetId)=>{
  const res = await axios.put(`/friend/block?targetId=${targetId}`)
  return res.data
}
/** 친구 차단 해제 */
export const unblockUser = async(userId)=>{
  const res = await axios.delete(`/friend/unBlock?targetId=${userId}`)
  return res.data
}
/**친구 삭제 */
export const deleteFriend = async(friendId)=>{
  const res = await axios.delete(`friend/delete?friendId=${friendId}`)
  return res.data
} 
