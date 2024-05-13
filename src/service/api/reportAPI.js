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
  //채팅신고하기
  export const reportChat = async(body)=>{

  }
  //게시글신고목록
  export const getPostReportList = async ()=>{
    const res = await axios.get("/report/post")
    return res.data;
  
  }
  //댓글신고목록
  export const getCommentReportList = async()=>{
    const res = await axios.get("/report/comment")
    return res.data;
  }
  //채팅신고목록
  export const getChatReportList = async()=>{
    
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
  //채팅신고 처리
  export const updateChatReport = async(reportId)=>{
    
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