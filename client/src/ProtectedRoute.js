import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";

const ProtectedRoute = () => {
  //creating state variables for if the user is authenticated and if
  //the component is loading
  //some flags here I be creating
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //function for checking if the user is authenticated
  const checkIsAuth = async () => {
    //send server get request with the cookie
    try {
      //if there is a response then the cookie is valid
      const res = await axios.get("user/isauth");
      console.log(res);
      //set auth flag to true
      setAuth(true);
      //if there is an error then the cookie is invalid
    } catch (error) {
      console.log(error);
      //set auth flag to false
      setAuth(false);
    }
    //set the is loading flag to false
    setIsLoading(false);
  };

  //using useeffect to check if the user is authenticated
  useEffect(() => {
    checkIsAuth();
    return () => {};
  }, []);

  //if the isLoading flag is true
  if (isLoading) {
    //render a loading component until the user is validated
    return <Loading />;
  }

  //if the auth flag is true
  //render the sidebar and the component in the route selected
  return auth ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    //OR send them back to the login page....
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
