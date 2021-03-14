import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null)
  })
}

export default function Navbar(props) {
  return (
      <nav >
        {props.user ? (
          <div className="navbar navbar-light" style={{backgroundColor: "#9b9fb0"}}>
            <div style={{width: '100%'}} className="nav-item d-flex flex-row justify-content-between" >
                <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/'>Home</Link>
                <span className="navbar-brand h1" style={{height: '1vh', color: 'white'}}>Yolo Trader</span>
                <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/' onClick={() => handleLogout(props)} >Logout</Link>
            </div>
          </div>
          ) : (
              <>
              </>
            )}
    </nav>
  )
}
