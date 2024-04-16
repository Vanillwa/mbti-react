import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./component/Header";
import  Nav  from "./component/Nav";
function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <Routes>
        
      </Routes>
    </div>
  );
}

export default App;
