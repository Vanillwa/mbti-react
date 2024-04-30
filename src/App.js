// App.js 파일 내용
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import MemberRevise from "./pages/MemberRevise"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import PostList from "./pages/PostList";
import Layout from "./component/layout";

import PostView from "./pages/PostView";
import PostWrite from "./pages/PostWrite";
import Profile from "./pages/Profile";
import FindPwd from "./pages/FindPwd";
import UpdatePassword from "./pages/UpdatePassword"
import CompleteLogin from "./pages/CompleteLogin";
import PostEdit from "./pages/PostEdit";
import UserDelete from "./pages/UserDelete";
import FriendList from "./pages/FriendList";
import ReportList from "./pages/ReportList";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="post">
            <Route path="list" element={<PostList />} />
            <Route path="view" element={<PostView />}/>
            <Route path="write" element={<PostWrite/>}></Route>
            <Route path="edit" element={<PostEdit/>}></Route>
           
          </Route>
          <Route path="reportlist" element={<ReportList/>}/>
          <Route path="user">
            <Route path=":userId" element={<Profile  />}/>
          </Route>
          <Route path="friend" element={<FriendList/>}/>
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/memberevise" element={<MemberRevise />} />
        <Route path="/userdelete" element={<UserDelete />} />
        <Route path="/updatepwd" element={<UpdatePassword/>}/>
        <Route path="/findpwd" element={<FindPwd />}/>
        <Route path="/completelogin" element={<CompleteLogin/>}/>
       
      </Routes>
    </div>
  );
}

export default App;
