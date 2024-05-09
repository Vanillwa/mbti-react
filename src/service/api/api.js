import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;





export const getUserList = async (filter,keyword,type,page,size) => {
  console.log("page :",page ,"size:",size)
  const res = await axios.get(`/user?filter=${filter}&keyword=${keyword}&type=${type}&page=${page}&size=${size}`);
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



// 단일 게시글 조회

export const getProfileList = async (userId)=>{
  const res =  await axios.get(`/user/${userId}`)
  return res.data;
}



