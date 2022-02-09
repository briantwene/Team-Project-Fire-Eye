import React, { useState } from "react";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
import LiveStream from "./pages/LiveStream";
import Gallery from "./pages/Gallery";
import Setting from "./pages/Settings";
import Logout from "./pages/Logout";
import { Axios } from "axios";

function App() {
  //using useState for the token for auth
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  const login = (username, password) => {
    Axios.post("/auth/user", { username: username, password: password })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setLoginStatus(response.data.message);
          navigate("/");
        }
      })
      .catch(({ response }) => {
        console.log(response);

        setLoginStatus(response.data.message);
      });
  };

  const logout = () => {
    setIsAuth(false);
    navigate("/login");
  };
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/livestream" element={<LiveStream />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>

      {/* <Routes>
        <Route path="/login" element={<Login loginHandler={login} />} exact />
        <Route element={<ProtectedRoute auth={isAuth} />}>
          <Route path="/logout" element={<Logout logoutHandler={logout} />} />
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
