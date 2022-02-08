import React from "react";

function Home() {
  return (
    <div className="home">
      <h1>Dashboard</h1>

      <div className=" container-space home__display">
        <div className="home__display--item pictures">
          <p>Pictures</p>
          <h2>20</h2>
        </div>

        <div className="home__display--item videos">
          <p>Videos</p>
          <h2>5</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
