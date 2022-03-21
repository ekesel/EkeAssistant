import React, { useState } from 'react';
import './App.css';
import SideBar from './SideBar';
import Api from './api';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const EmptyDetails = {
  email: "",
  password: ""
};


function Login() {

  if(localStorage.getItem('Token') != null) {
    localStorage.removeItem('Token'); }

  const [Details, setDetails] = useState(EmptyDetails);

  let navigate = useNavigate();
  function handleEmail(e) {
    let newEmail = { ...Details };
    newEmail.email = e.target.value;
    setDetails(newEmail);
  }
  function handlePassword(e) {
    let newPassword = { ...Details };
    newPassword.password = e.target.value;
    setDetails(newPassword);
  }

  function getLogin() {
    const data = {
      email: Details.email,
      password: Details.password
    }
    Api.postApi('/login', data)
      .then(function (response) {
        console.log(response.data, 'response of login api----');
        if (response.status === 200) {
          localStorage.setItem('Token', response.data.token);
          return navigate("/");
        }
        else if (response.status === 501) {
          alert("User not Found");
          return navigate("/Register");
        }
        else if (response.status === 406) {
          alert("Please Enter Valid Information!");
        }
        else {
          alert("Something went Wrong!");
        }
      }).catch((error) => {
        console.log("error-----------", error)
      })
  }



  return (
    <div>
      <SideBar />
      <div id="Login">
        <div className="col-md-6 col-md-offset-3">
          <div className="p-3">
            <h2>Login | EkeAssist</h2>
          </div>
          <form>
            <div className='form-group'>
              <label>Email:</label>
              <input type="email" name="email" className="form-control" onChange={handleEmail} value={Details.email} />
            </div>
            <div className='form-group'>
              <label>Password: </label>
              <input type="password" name="password" className="form-control" onChange={handlePassword} value={Details.password} />
            </div>
            <button type="button" className="btn btn-primary my-2" onClick={getLogin}>Login</button>
            <Link to="/Register" className="btn btn-link">Register</Link>
          </form></div>
      </div>
    </div>
  )
}
export default Login;
