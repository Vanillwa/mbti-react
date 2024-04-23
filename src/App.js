// App.js 파일 내용
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import MemberRevise from "./pages/MemberRevise"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import

import PostList from "./pages/PostList";
import Layout from "./component/layout";

import PostView from "./pages/PostView";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import FindPwd from "./pages/FindPwd";
import ResetPassword from "./pages/ResetPassword";
import UpdatePwd from "./pages/UpdatePwd";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="post">
            <Route path="list" element={<PostList />} />
            <Route path="view" element={<PostView />}/>
            <Route path="write" element={<Write/>}></Route>
          </Route>
          <Route path="user">
            <Route path=":userId" element={<Profile  />}/>
          </Route>
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />

        <Route path="/MemberRevise" element={<MemberRevise />} />

        <Route path="/findpwd" element={<FindPwd />}/>
        <Route path="/updatepwd" element={<UpdatePwd/>}/>
      </Routes>
    </div>
  );
}

export default App;
