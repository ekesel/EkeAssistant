import React, { useEffect, useState } from 'react';
import './App.css';
import SideBar from './SideBar';
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [UserIsLogged, setUserIsLogged] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('Token') != null) {
        localStorage.removeItem('Token');
        setUserIsLogged(false);
        return navigate("/Login");
      }
    })();
  }, [UserIsLogged]);

  return (
    <div>
      <SideBar />
      <div id="Logout">
      {!UserIsLogged ? navigate("/Login") : (<></>)}
      </div>
    </div>
  )
}
