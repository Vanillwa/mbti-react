import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import  Nav  from "./component/Nav";
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Main/>}></Route>
      <Header/>
      <Nav/>
      </Routes>
    </div>
  );
}

export default App;
