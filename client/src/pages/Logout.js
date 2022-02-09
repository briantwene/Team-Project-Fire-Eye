import React from "react";

function Logout({ logoutHandler }) {
  return (
    <div className="logout">
      <h1>Logout</h1>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}

export default Logout;
