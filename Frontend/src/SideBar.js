import React, { useState, useEffect } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaBook,FaMedapps, FaHome, FaMobileAlt, FaCode, FaJenkins, FaAngellist } from 'react-icons/fa';
import './App.css';
import { Link } from "react-router-dom";

function SideBar() {
  const [UserIsLogged, setUserIsLogged] = useState(false);


  useEffect(() => {
    (async () => {
      if (localStorage.getItem('Token') != null) setUserIsLogged(true);
    })();
  }, [UserIsLogged]);

    return (
        <div id="SideBar">
        <ProSidebar>
  <SidebarHeader>
      <div id='page-wrap'>
    <h1>EkeAssist</h1>
    </div>
  </SidebarHeader>
  <SidebarContent>
  <Menu iconShape="square">
    <MenuItem icon={<FaHome />}><Link to="/">Home</Link></MenuItem>
    {!UserIsLogged ? (
      <MenuItem icon={<FaMedapps />}><Link to="/Register">Register</Link></MenuItem>
     ) : ( 
      <MenuItem icon={<FaJenkins />}><Link to="/Profile">Profile</Link></MenuItem>
    )}
    <MenuItem icon={<FaMobileAlt />}><Link to="/Devices">Devices</Link></MenuItem>
    <MenuItem icon={<FaBook />}><Link to="/Commands">Commands</Link></MenuItem>
    <MenuItem icon={<FaCode />}><Link to="/About">About</Link></MenuItem>
  </Menu>
  </SidebarContent>
  <SidebarFooter>
    <Menu>
      {UserIsLogged ? (
    <MenuItem icon={<FaAngellist />}><Link to="/Logout">Logout</Link></MenuItem>
    ) : (
      <MenuItem icon={<FaMedapps />}><Link to="/Login">Login</Link></MenuItem>
    )}
    </Menu>
  </SidebarFooter>
</ProSidebar>
        </div>
    )
}
export default SideBar;