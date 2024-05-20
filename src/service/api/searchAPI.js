import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getSearchResult = async(keyword) =>{
  const res = await axios.get(`/search?keyword=${keyword}`)
  return res.data;
}