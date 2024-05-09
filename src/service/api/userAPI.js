import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;


export const getUserList = async (filter,keyword,type,page,size) => {
  console.log("page :",page ,"size:",size)
  const res = await axios.get(`/user?filter=${filter}&keyword=${keyword}&type=${type}&page=${page}&size=${size}`);
  return res.data;
};




