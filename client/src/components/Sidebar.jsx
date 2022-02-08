import React, {useState} from 'react';
//Creates states that can be passed in components
import *as FaIcons from "react-icons/fa";
import *as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom"
import {SidebarData} from './SidebarData'
import { IconContext } from 'react-icons'


function Sidebar() {
  const[navbar, setnavbar] = useState(false)

  const shownavbar = () => setnavbar(!navbar)

  return (

    <>
  
    <IconContext.Provider value={{color: '#fff'}}>
      <div className="Sidebar">
        <div className='username'>
        <h1>Hi FireEye</h1>
        </div>
        
      <Link to="#" className='menu-bars'>
        <FaIcons.FaBars style={{color:'#D9843B'}} onClick={shownavbar} />
      </Link>

      </div>
      {/* state hooks. If icon is clicked we want class to nav menu. Which is showing */}


    <nav className ={navbar ? 'nav-menu active': 'nav-menu'}>

      <ul className='nav-menu-items' onClick={shownavbar} >
        <li className='navbar-toggle'>
          <Link to ="#" className='menu-bars'>
          <AiIcons.AiOutlineClose />
          </Link>
        </li>

        {SidebarData.map((item, index) => {

          return(
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>

            </li> 

          )

        })}

    
      </ul>


    </nav>
    </IconContext.Provider>
    </>
  )
}

export default Sidebar;
