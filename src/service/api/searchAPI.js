import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;


export const getSearchResult = async(keyword,page,size) =>{
  const res = await axios.get(`/search?keyword=${keyword}&page=${page}&size=${size}`)
  return res.data;
}