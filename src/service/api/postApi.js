import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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

export const getPostList = async (mbti, size, sort, order, page) => {
  const res = await axios.get(`/post/list?mbti=${mbti}&size=${size}&sort=${sort}&order=${order}&page=${page}`);
  return res.data;
};

export const getPostView = async (postId) => {
  const res = await axios.get(`/post/${postId}`);
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
 