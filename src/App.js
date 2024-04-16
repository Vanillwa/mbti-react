import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import  Nav  from "./component/Nav";
import LeftSidebar from "./component/LeftSidebar";
function App() {
  return (
    <div className="App">
      <Nav/>
      <LeftSidebar/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
