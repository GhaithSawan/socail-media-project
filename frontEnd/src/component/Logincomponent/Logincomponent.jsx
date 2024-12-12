import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Logincomponent.css"
const Logincomponent = () => {
  return (
    <div>
      <div className="card flex">
        <span>Welcome! to my Social Media app</span>
        <span>Please login</span>
        <div className='inputs'>
          <div className='inputs ' >
            <label htmlFor="emailInput">Email</label>
            <input id='emailInput' type="email" placeholder='email' />
          </div>
          <div className='inputs ' >
            <label htmlFor="passwordInput">Password</label>
            <input id='passwordInput' type="password" placeholder='password' />
          </div>
        </div>
        <Button variant="primary" className='w-100 my-3'>Login</Button>
        <Link to={"/register"} style={{fontSize:"15px",width:"100%"}}>
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default Logincomponent