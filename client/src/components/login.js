import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  //setting state for user credentials and login error message
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // function for logging the user in when the form is submitted
  const login = () => {
    //send http post request, submitting the credentials to the backend
    Axios.post("/auth/user", { username: username, password: password })
      .then((response) => {
        //code will go to then if the response is 200 OK
        console.log(response);
        //if there is data in the body of the response
        if (response.data) {
          //set the login status
          setLoginStatus(response.data);
          //and naviaget the user to the dashboard
          navigate("/");
        }
      }) //if there is an error, tell the user at the bottom if the login page
      .catch(({ response }) => {
        console.log(response);
        setLoginStatus(response.data.message);
      });
  };
  return (
    //login form
    <div className="login-container">
      <div className="logo-container">
        <span className="logo-text">F I R E E Y E</span>
      </div>
      <form className="login-form">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <span>Login with the data you entered during your registration</span>

        <div className="form-field">
          <p className="label">Username</p>

          <input
            type="text"
            className="field"
            onChange={(e) => {
              console.log(e);
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-field">
          <p className="label">password</p>
          <input type="text" className="field" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              login(username, password);
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div className="login-status">
        <span>{loginStatus}</span>
      </div>
    </div>
  );
}

export default Login;
