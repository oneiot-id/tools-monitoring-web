// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <LoginPage/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginPage/>}/>
    //     <Route path="/dashboard" element={<Dashboard/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
