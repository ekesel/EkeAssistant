import React from 'react';
import './App.css';
import SideBar from './SideBar';

export default function About() {
  return (
    <div>
      <SideBar />
    <div id="About">
      <div className="p-2 m-2">
        <h1> About EkeAssist </h1>
        </div>
        <div className="p-3">
          <div className="card">
            <div className="card-body">
              <p>A web-assistant that control your devices connected to your Raspberry Pi and perform some basic assistant tasks such as telling News, Checking Weather and connect to your Spotify to play songs. It works on Voice recognition like a assistant should!</p>
              <p>Installation Guide and Instructions can be found on  <a href="https://github.com/ekesel/EkeAssistant"> this Github Repo</a></p>            
            </div>
          </div>
        </div>
        </div>
        </div>
  )
}
