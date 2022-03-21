import React, { useEffect } from 'react';
import './App.css';
import SideBar from './SideBar';
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('Token') === null) {
      return navigate("/login");
    }},);
  function myfunction(){

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:8000/profile", false); // server url here!
    let tmp = "Token "+localStorage.getItem('Token');
    xhr.setRequestHeader("Authorization", tmp);
    xhr.send("");
    var out = JSON.parse(xhr.responseText);
    return (<>
      <h5>Username - {out.username}</h5>
      <h5>Email - {out.email}</h5>
      </>
    )
    }
  return (
    <div>
      <SideBar />
    <div id="Profile">
        <div className="my-2 p-3">
          <h1>Your Profile</h1>
        </div>
        <div className="p-2">
          <div className="card">
            <div className="card-body">
            {myfunction()}
            </div>
          </div>
        </div>
        </div>
        </div>
  )
}
