import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;


//게시글신고하기
export const reportPost = async (body) =>{
    const res = await axios.post("/post/report",body)
    return res.data;
  }
  //댓글신고하기
  export const reportComment = async(body) =>{
    const res = await axios.post("/comment/report",body)
    return res.data;
  }
  //채팅방신고하기
  export const reportChatRoom = async(body)=>{
    const res = await axios.post("/chatroom/report",body)
    return res.data;
  }
  //게시글신고목록
  export const getPostReportList = async (page)=>{
    const res = await axios.get(`/report/post?page=${page}`)
    return res.data;
  
  }
  //댓글신고목록
  export const getCommentReportList = async(page)=>{
    const res = await axios.get(`/report/comment?page=${page}`)
    return res.data;
  }
  //채팅방신고목록
  export const getChatRoomReportList = async(page)=>{
    const res = await axios.get(`/report/chatroom?page=${page}`)
    return res.data;
  }
 //채팅방신고 메세지 조회
 export const getChatRoomReportMessageList = async(roomId)=>{
  const res = await axios.get(`/report/chatroom/message?roomId=${roomId}`)
  return res.data;
 }
  //게시글신고처리
  export const updatePostReport = async (reportId)=>{
    const res = await axios.put(`/report/post/${reportId}`)
    return res.data;
  }
  //댓글신고 처리
  export const updateCommentReport = async (reportId)=>{
    const res = await axios.put(`/report/comment/${reportId}`)
    return res.data;
  }
  //채팅방신고 처리
  export const updateChatRoomReport = async(reportId,targetId,roomId)=>{
    console.log(targetId,roomId)
    const res= await axios.put(`/report/chatroom/${reportId}`,{targetId,roomId})
    
    return res.data;
  }
  //계정정지
export const suspendUser = async(body)=>{
  const res = await axios.put(`/user/block`,body)
  return res.data;
}
//차단해제
export const releaseUser = async(userId)=>{
  const res =await axios.put(`/user/unblock?userId=${userId}`)
  return res.data;
}