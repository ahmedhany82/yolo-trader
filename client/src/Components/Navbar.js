import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null)
  })
}

export default function Navbar(props) {
  console.log(props.user)
  return (
    <div className="navbar navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        {props.user ? (
            <div style={{width: '100%'}} className="nav-item d-flex flex-row justify-content-between" >
                <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/'>Home</Link>
                <h1 className="navbar-brand" style={{height: '1vh'}}>Yolo Trader</h1>
                <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/' onClick={() => handleLogout(props)} >Logout</Link>
            </div>
          ) : (
              <div>
                  <Link to='/signup'>Signup</Link>
                  <Link to='/login'>Login</Link>
              </div>
            )}
      </div>
    </div>
  )
}