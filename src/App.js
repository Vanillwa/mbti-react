// App.js 파일 내용
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import MemberRevise from "./pages/MemberRevise"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import PostList from "./pages/PostList";
import Layout from "./component/layout";
import PostView from "./pages/PostView";
import PostWrite from "./pages/PostWrite";
import Profile from "./pages/Profile";
import FindPwd from "./pages/FindPwd";
import UpdatePassword from "./pages/UpdatePassword";
import CompleteLogin from "./pages/CompleteLogin";
import PostEdit from "./pages/PostEdit";
import UserDelete from "./pages/UserDelete";
import FriendList from "./pages/FriendList";
import ReportList from "./pages/ReportList";

import UserList from "./pages/UserList";
import { fetchLogout } from "./service/api/loginAPI";
import { AuthContext, useAuthContext } from "./context/AuthContext";
import sweetalert from "./component/sweetalert";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import GlobalStyles from "./GlobalStyles";

function App() {
  const { memoUserInfo, socket, logout } = useAuthContext();
  const { isLoggedIn } = memoUserInfo;
  const navigate = useNavigate();


  if (isLoggedIn) {
    socket.emit("refresh")

    socket.on("uBlocked", async () => {
      console.log("로그아웃 요청 도착")
      socket.emit("logout");
      const result = await fetchLogout();
      if (result.message === "success") {
        logout();
        navigate("/", { state: "logout" });
        sweetalert.warning("차단된 계정입니다.", "", "닫기");
      }
    });

    socket.on("duplicatedLogin", async () => {
      socket.emit("logout");
      const result = await fetchLogout();
      if (result.message === "success") {
        logout();
        navigate("/", { state: "logout" });
        sweetalert.warning("로그인 중복이 감지되었습니다.", "", "닫기");
      }
    });
  }


  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="post">
            <Route path="list" element={<PostList />} />
            <Route path="view" element={<PostView />} />
            <Route path="write" element={<PostWrite />}></Route>
            <Route path="edit" element={<PostEdit />}></Route>
          </Route>
          <Route path="reportlist" element={<ReportList />} />

          <Route path="user">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<Profile />} />
          </Route>
          <Route path="friend" element={<FriendList />} />

          <Route path="chat">
            <Route index element={<Chat />} />
          </Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />

        <Route path="memberevise" element={<MemberRevise />} />
        <Route path="userdelete" element={<UserDelete />} />
        <Route path="updatepwd" element={<UpdatePassword />} />
        <Route path="findpwd" element={<FindPwd />} />
        <Route path="completelogin" element={<CompleteLogin />} />
      </Routes>
    </div>
  );
}

export default App;
