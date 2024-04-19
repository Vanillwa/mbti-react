// App.js 파일 내용
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import PostList from "./pages/PostList";
import Layout from "./component/layout";
import FindPwd from "./pages/FindPwd";
import Profile from "./pages/Profile";
import PostView from "./pages/PostView";
import MemberRevise from "./pages/MemberRevise";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="post">
            <Route path="list" element={<PostList />} />
            <Route path="view" element={<PostView />}/>
          </Route>
          <Route path="user">
            <Route path=":userId" element={<Profile  />}/>
          </Route>
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/MemberRevise" element={<MemberRevise />} /> 
        <Route path="/join" element={<Join />} /> 
        <Route path="/findpwd" element={<FindPwd />}/>
      </Routes>
    </div>
  );
}

export default App;
