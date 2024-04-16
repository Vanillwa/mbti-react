import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./component/Header";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
