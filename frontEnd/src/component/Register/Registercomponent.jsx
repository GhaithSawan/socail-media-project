import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { CiImageOn } from "react-icons/ci";

const Register = () => {
  return (
    <div>
      <div className="card flex">
        <span>Welcome! to my Social Media app</span>
        <span>Please create an account</span>
        <div className='inputs'>
          <div className='inputs' >
            <label htmlFor="Username">Username</label>
            <input id='Username' type="text" placeholder='Username' />
          </div>
          <div className='inputs ' >
            <label htmlFor="emailInput">Email</label>
            <input id='emailInput' type="email" placeholder='email' />
          </div>
          <div className='inputs ' >
            <label htmlFor="passwordInput">Password</label>
            <input id='passwordInput' type="password" placeholder='password' />
          </div>
          <div className='inputs' >
            <Button variant="primary" className=' my-3'>
              <label htmlFor="imageInput" className='w-100'>
                Profile image <CiImageOn style={{ fontSize: "25px" }} />
              </label>
            </Button>
            <input id='imageInput' type="file" placeholder='email' />
          </div>
        </div>
        <Button variant="primary" className='w-100 my-3'>Login</Button>
        <Link to={"/Login"} style={{ fontSize: "15px", width: "100%" }}>
          i already have an account
        </Link>
      </div>
    </div>
  )
}
export default Register