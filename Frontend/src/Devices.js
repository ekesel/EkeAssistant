import React, { useEffect, useState } from 'react';
import './App.css';
import SideBar from './SideBar';
import { useNavigate } from "react-router-dom";


export default function Devices() {
  const [devices, setDevices] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('Token');
    if (token === null) {
      return navigate("/login");
    }
    
    let ws = new WebSocket('ws://127.0.0.1:8000/ws/status/1/?token='+token);
      ws.onopen = () => {
        console.log('WebSocket Client Connected');
      };
  
      ws.onmessage = (message) => {
        let data = message['data'];
        let stuf = JSON.parse(data);
        let stuff = stuf['fields'];
        try {
          if(stuff == null) {
            setDevices([]);
          }
          else {
            setDevices(stuff);
          }
        }
        catch(err) {
          console.log(err);
        }
        console.log(devices);
      };
      ws.onerror = function() {
        console.log('Connection Error');
  };
  return () => ws.close();
  },[]);
  
  return (
    <div>
      <SideBar />
    <div id="Devices">
        <div className="p-2 m-2">
        <h1>Your Devices</h1>
        </div>
        {devices.map(device => (
          <div className="card p-2">
            <div className="card-body">
            <h4>Unique Device Name - {device['udn']}</h4>
            <h5>Status - {device['status']}</h5>
            <h6>Serial id - {device['serialid']}</h6>
            </div>
            </div>
      ))}
        </div>
        </div>
  )
}
