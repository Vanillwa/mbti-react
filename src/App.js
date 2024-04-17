// App.js 파일 내용
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join"; // './pages/Join' 경로에 있는 Join 컴포넌트를 import

import List from "./pages/List";
import Layout from "./component/layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/list" element={<List />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
