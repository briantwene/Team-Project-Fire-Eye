import React, { useState } from "react";
import Axios from "axios";

function Login({ loginHandler }) {
  //setting state for user credentials and login error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  //function for logging the user in when the form is submitted
  const login = () => {
    Axios.post("/auth/user", { username: username, password: password })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setLoginStatus(response.data.message);
        }
      })
      .catch(({ response }) => {
        console.log(response);

        setLoginStatus(response.data.message);
      });
  };
  return (
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
          <input type="password" className="field" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button
            className="login-btn"
            // onClick={(e) => {
            //   e.preventDefault();
            //   login();
            // }

            onClick={loginHandler}
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
