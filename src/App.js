import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import  Nav  from "./component/Nav";
import LeftSidebar from "./component/LeftSidebar";
function App() {
  return (
    <div className="App">
      <Nav/> {/* 확인용으로 일단 상단에 배치하겠습니다. */}
      <LeftSidebar/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
