import React, { useState } from 'react';
import './App.css';
import SideBar from './SideBar';
import Api from './api';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const EmptyDetails = {
    first_name: "",
    last_name: "",
    email:"",
    password: ""
  };

function Register() {

    if(localStorage.getItem('Token') != null) {
        localStorage.removeItem('Token'); }

    const [Details, setDetails] = useState(EmptyDetails);
    let navigate = useNavigate();

    function handleFirstName(e)
    {
        let newFirstName = {...Details};
        newFirstName.first_name = e.target.value;
        setDetails(newFirstName);
    }
    function handleLastName(e)
    {
        let newLastName = {...Details};
        newLastName.last_name = e.target.value;
        setDetails(newLastName);
    }
    function handleEmail(e)
    {
        let newEmail = {...Details};
        newEmail.email = e.target.value;
        setDetails(newEmail);
    }
    function handlePassword(e)
    {
        let newPassword = {...Details};
        newPassword.password = e.target.value;
        setDetails(newPassword);
    }
    function getRegister()
    {
        const data = {
            first_name: Details.first_name,
            last_name: Details.last_name,
            email: Details.email,
            password: Details.password
        }
        Api.postApi('/register', data)
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem('Token', response.data.token);
                    return navigate("/");
                }
                else if (response.status === 406) {
                    alert("Email Already Exists");
                    return navigate("/Register");
                }
                else if (response.status === 400) {
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
            <div id="Register">
                <div className="col-md-6 col-md-offset-3">
                    <div className="p-3">
                    <h2>Register | EkeAssist</h2>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label>First Name:</label>
                            <input type="text" name="first_name" className="form-control" onChange={handleFirstName} value={Details.first_name} />
                        </div>
                        <div className='form-group'>
                            <label>Last Name:</label>
                            <input type="text" name="last_name" className="form-control" onChange={handleLastName} value={Details.last_name} />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="email" name="email" className="form-control" onChange={handleEmail} value={Details.email} />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input type="password" name="password" className="form-control" onChange={handlePassword} value={Details.password} />
                        </div>
                        <button type="button" className="btn btn-primary my-2" onClick={getRegister}>Register</button>
                        <Link to="/login" className="btn btn-link">Login</Link>
                    </form></div>
            </div>
        </div>
    )
}

export default Register;
