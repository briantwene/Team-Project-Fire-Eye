import React from 'react';
import *as AiIcons from "react-icons/ai";

function Setting() {
  return(<div className='settings'>
       <h1>Account Settings</h1>
      

       

       <div className='wrapper'>
         <div className="w1"> <h4 className='profilePic'> <AiIcons.AiOutlineUser/>Profile Details</h4>


            <div className='uname'> 
            <label for="username"><h7>Username</h7> </label>
            <input type="text" id="username" name="username"></input>

            </div>

            <div className='email'>
              <label for="email"><h7>Email</h7></label>
              <input type="text" id="email" name="email"></input>
              
              </div>
            
            </div>


         <div className="w2" >
           <h4 className='iconsC'> <AiIcons.AiFillLock/> Change password</h4> 


            <div className='textWrap'>
            <h9>You can permanently delete or temporarily freeze your account</h9>

            </div>

            <div className='password'>
              <button className="passRadius" type="button" onclick={alert("you clicked me")}><h2>Change Password</h2></button>
            </div>


         
         </div>
         <div className="w3">
           <h4 className='iconsC'>Close account</h4>

              <div className='textWrap'>
              <h9>You can permanently delete or temporarily freeze your account</h9>
              </div>

              <div className='accountClose'>
              <button className="passRadius" type="button" onclick={alert("you clicked me")}><h2>Close Account</h2></button>
              </div>
         </div>

       </div>

      

   </div>)
}

export default Setting; 