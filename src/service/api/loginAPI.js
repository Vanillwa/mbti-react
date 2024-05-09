import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

//로그인
export const fetchLogin = async (body) => {
    const res = await axios.post("/login", body);
    return res.data;
  };
//로그아웃
  export const fetchLogout = async () => {
    const res = await axios.get("/logout");
    return res.data;
  };

  //비밀번호 찾기 이메일 인증

export const requestCodeFindPwd = async (email) => {
    const res = await axios.post("/updatePassword/requestEmailVerification", {
      email,
    });
    return res.data;
  };
  
  export const checkCodeFindPwd = async (verifyNumber) => {
    const res = await axios.post("/updatePassword/checkEmailVerification", {
      verifyNumber,
    });
    return res.data;
  };
  
  export const emailChangedFindPwd = async () => {
    const res = await axios.get("/updatePassword/emailChanged");
    return res.data;
  };
  //비밀번호 재설정하기
  export const requestUpdatePwd = async (password) => {
    const res = await axios.post("/updatePassword", { password });
    return res.data;
  };