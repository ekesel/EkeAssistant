import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,  Routes,
  Route } from "react-router-dom";
import Profile from './Profile';
import About from './About';
import Devices from './Devices';
import Commands from './Commands';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="About" element={<About />} />
      <Route path="Devices" element={<Devices />} />
      <Route path="Commands" element={<Commands />} />
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="Logout" element={<Logout />} />
    </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
