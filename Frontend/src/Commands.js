import React from 'react';
import './App.css';
import SideBar from './SideBar';

export default function Commands() {
  return (
    <div>
      <SideBar />
    <div id="Commands">
      <div className="m-2">
      <h1>Commands</h1>
      </div>
      <div className="p-2">
        <div className="card">
          <div className="card-body">
            <ul>
              <li>
                <h5>Get News</h5>
                <p>For news, Just utter the word "news" and it will revert back with the top-headlines.</p>
                </li>
                <li>
                <h5>Get Weather Report</h5>
                <p>You need to give location permission for this to work. After you have given the permission once
                  You just have to say "weather" and it will return tell the weather report of your area.
                </p>
                </li>
                <li>
                  <h5>Play With Spotify</h5>
                  <p>First, You have to obtain a developer account on spotify which is easy to get. After that go to the homepage
                    and hit login to login with that account. With this, The initial setup is done. Now Whenever you want just say "play" and then the song name you want it to play. 
                    For Example "play alone" will play the alone song.
                  </p>
                </li>
                <li>
                  <h5>Control Rpi Devices</h5>
                  <p>For this, You need to first setup the client device as said in the Github Repo instructions. After that
                    you will get the initial login for the client, do the login and once its setup, whenever the device is switched on, 
                    You can see it in the /devices section in the website. Now use the command "toggle udn with gpio_pin". For example, My UDN
                    is rpi11 and i want to toggle gpio 26 so i have to say "toggle rpi11 with 26" this will immediately look for rpi11 device and
                    toggle its gpio pin 26.
                  </p>
                </li>
            </ul>
          </div>
        </div>
      </div>
        </div>
        </div>
  )
}
