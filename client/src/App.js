import React, { useState } from "react";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
import Explorer from "./pages/Explorer";
import Gallery from "./pages/Gallery";
import Setting from "./pages/Settings";
import Logout from "./pages/Logout";
import Upload from "./pages/Upload";
import { Axios } from "axios";
import FolderGenerator from "./pages/Explorer";
import { files } from "./components/foldertree";

const directory = "C:/Users/Brian Twene/Documents/DT080A-Year-3";
function App() {
  //using useState for the token for auth
  const [isAuth, setIsAuth] = useState(true);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    setIsAuth(false);
    navigate("/login");
  };
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/explorer" element={<Explorer directory={directory} />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route path="/upload" element={<Upload />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* This will most likely be the new Routes
      If you want to remove the login page you can comment this block and uncomment the top one... */}
      {/* <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route element={<ProtectedRoute auth={isAuth} />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/livestream" element={<LiveStream />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Setting />} />
        </Route>
      </Routes> */}

      {/* if you want to see the login uncomment this line and comment all the stuff in the Router Tag */}
      {/* <Login /> */}
    </>
  );
}

export default App;
