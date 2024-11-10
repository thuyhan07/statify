
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ContextProvider } from "./context/Context";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";
import UserData from "./components/UserData";

function App() {

  return (<BrowserRouter>
    <ContextProvider>
    <div className="App">
      
      <NavBar/>
      <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="/myprofile" element={<UserData />} />
        </Routes>
      
    </div>
    </ContextProvider></BrowserRouter>
  );
}

export default App;
