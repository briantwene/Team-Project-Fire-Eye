import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  //set up naviagte function that will be used to redirect the user
  const navigate = useNavigate();

  //logout function
  const logout = async () => {
    //sent request to server to delete the cookie
    const loggedOut = await axios.post("/auth/logout");
    //if there is a response
    if (loggedOut) {
      //navigate to the user to the login page
      navigate("/login");
    }
  };

  //using useEffect to run the logout function
  //when the page is loaded
  useEffect(() => logout());
  return (
    <div className="logout">
      <h1>Logout</h1>
      <span>Logging you out</span>
    </div>
  );
}

export default Logout;
