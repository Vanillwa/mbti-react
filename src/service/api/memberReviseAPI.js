import axios from "axios";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;



// 회원정보수정 - 닉네임 중복체크
export const userCheckDuplicationNickname = async (body) => {
    const res = await axios.post(
      "/updateUserInfo/checkDuplicationNickname",
      body
    );
    return res.data;
  };
  
// 회원정보수정 - 닉네임값 변경시 세선 삭제
export const userNickNameChanged = async () => {
    const res = await axios.get("/updateUserInfo/nicknameChanged");
    return res.data;
  };
  // 회원정보수정 - 닉네임 변경
  export const userUpdateNickname = async (body) => {
    const res = await axios.put("/updateUserInfo/nickname", body);
    return res.data;
  };
  
  // 회원정보수정 - 비밀번호 변경
  export const userUpdatePassword = async (body) => {
    const res = await axios.put("/updateUserInfo/password", body);
    return res.data;
  };
  
  // 회원정보수정 - 유저 프로필 변경
  export const userUpdateImg = async (body) => {
    const res = await axios.put("/updateUserInfo/updateProfileImage", body);
    return res.data;
  };


  // 회원정보수정 - 유저 mbti 변경
export const userUpdateMbti = async (body) => {
    const res = await axios.put("/updateUserInfo/mbti", body);
    return res.data;
  };
  



  // 회원정보수정 - 유저 Img 삭제
  
  export const userDeleteImage = async (body) => {
    const res = await axios.delete("/updateUserInfo/deleteProfileImage", body);
    return res.data;
  };
  // 회원 탈퇴 
  export const deleteUser = async () => {
    const res = await axios.delete("/user");
    return res.data;
  };

  // 비번체크
export const deletePasswordCheck = async (body) => {
    const res = await axios.post("/deleteUser/passwordCheck", body);
    return res.data;
  };
  
  