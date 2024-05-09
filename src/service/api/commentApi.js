import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;


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
