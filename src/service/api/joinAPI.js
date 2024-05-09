import axios from "axios";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;



export const checkDuplicationEmail = async (body) => {
    const res = await axios.post("/join/checkDuplicationEmail", body);
    return res.data;
  };
  
  export const checkDuplicationNickname = async (body) => {
    const res = await axios.post("/join/checkDuplicationNickname", body);
    return res.data;
  };
  
  export const fetchJoin = async (body) => {
    const res = await axios.post("/join", body);
    return res.data;
  };

//인증 번호 확인을 위한 api
export const checkEmailVerification = async (code) => {
    const res = await axios.post("/join/checkEmailVerification", { code });
    return res.data;
  };
  
  // join.js
  
  // 인증번호 발송을 위한 api
  export const requestEmailVerification = async (email) => {
    const res = await axios.post("/join/requestEmailVerification", { email });
    return res.data;
  };
  
  // 회원가입 이메일 값 변경시 세션 삭제 api
  export const emailChanged = async () => {
    const res = await axios.get("/join/emailChanged");
    return res.data;
  };
  
  // 회원가입 닉네임 값 변경시 세션 삭제 api
  export const nickNameChanged = async () => {
    const res = await axios.get("/join/nickNameChanged");
    return res.data;
  };