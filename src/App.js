// App.js 파일 내용
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import
import Nav from "./component/Nav";
import LeftSidebar from "./component/LeftSidebar";

function App() {
  return (
    <div className="App">
      <Nav/>
      <LeftSidebar/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/join" element={<Join/>}></Route>
      </Routes>
    </div>
  );
}

export default App;