import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import DataHistory from "./pages/DataHistory";
import AlarmHistory from "./pages/AlarmHistory";
import ParameterSettings from "./pages/ParameterSettings";
import UserPage from "./pages/UserPage";
import { IUser } from "./types/user";
import SideAlarm from "./components/SideAlarm";
import MobileAlarm from "./components/MobileAlarm";
import { getUser } from "./utils/database";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    picture: "",
  });

  const location = useLocation();

  let hideNavbarPaths = ["/tools-monitoring-web/"];
  let showNavbar = !hideNavbarPaths.includes(location.pathname);

  const [showMobileAlarm, setShowMobileAlarm] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async() => {
    const u = await getUser()
    if(u)
      setUser(u);
  }

  useEffect(() => {
    if (localStorage.getItem("user") == null || undefined)
      navigate("/tools-monitoring-web/");
    else navigate("/tools-monitoring-web/dashboard");
    fetchUser()

  }, []);

  return (
    <>
      {/* Conditionally render the Navbar */}
      {showNavbar && (
        <div className="flex">
          <Navbar user={user} setShowAlarm={setShowMobileAlarm}/>
          <SideAlarm/>
          {
            showMobileAlarm &&
            <MobileAlarm show={setShowMobileAlarm}/>
          }
        </div>
      )}

      <Routes>
        <Route path="/tools-monitoring-web/" element={<LoginPage />} />
        <Route path="/tools-monitoring-web/dashboard" element={<Dashboard />} />
        <Route
          path="/tools-monitoring-web/data-history"
          element={<DataHistory />}
        />
        <Route
          path="/tools-monitoring-web/alarm-history"
          element={<AlarmHistory />}
        />
        <Route
          path="/tools-monitoring-web/parameter-settings"
          element={<ParameterSettings />}
        />
        <Route
          path="/tools-monitoring-web/user-page"
          element={<UserPage setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
