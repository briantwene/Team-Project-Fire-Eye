import React from "react";
import * as AiIcons from "react-icons/ai";

function Setting() {
  return (
    <div className="settings">
      <h1>Account Settings</h1>

      <div className="wrapper">
        <div className="w1">
          {" "}
          <div className="profilePic">
            {" "}
            <AiIcons.AiOutlineUser />
            <h4>Profile Details</h4>{" "}
          </div>
          <div className="uname">
            <p className="uname__title">Username</p>

            <p className="uname__user sub_Header"> John Doe</p>
          </div>
          <div className="email">
            <p className="email__title">Email</p>

            {/* //Handles multiple functions */}
            <p className="email__address sub_Header">JohnDoe@gmail.com</p>
          </div>
        </div>

        <div className="w2">
          <h4 className="iconsC">
            {" "}
            <AiIcons.AiFillLock /> Change password
          </h4>

          <div className="textWrap">
            <h9>You can permanently delete or temporarily freeze your account</h9>
          </div>

          <div className="password">
            <button className="passRadius" type="button" onclick={alert("you clicked me")}>
              <h2>Change Password</h2>
            </button>
          </div>
        </div>
        <div className="w3">
          <h4 className="iconsC">Close account</h4>

          <div className="textWrap">
            <h9>You can permanently delete or temporarily freeze your account</h9>
          </div>

          <div className="accountClose">
            <button className="passRadius" type="button" onclick={alert("you clicked me")}>
              <h2>Close Account</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
