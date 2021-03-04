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
    <div>
      <h1>Navbar</h1>
      <ul>
        {/* If we have a logged in user -> show projects and logout otherwise show login and signup */}
        {props.user ? (
          <>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/' onClick={() => handleLogout(props)} >Logout</Link>
            </li>
          </>
        ) : (
            <>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          )}
      </ul>
    </div >
  )
}