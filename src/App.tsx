import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    // <LoginPage/>
    // <Dashboard/>
    <BrowserRouter>
      <Routes>
        <Route path="/tools-monitoring-web/" element={<LoginPage/>}/>
        <Route path="/tools-monitoring-web/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
