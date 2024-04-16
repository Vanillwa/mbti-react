import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Routes>
        
      </Routes>
    </div>
  );
}

export default App;
