import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null)
  })
}

// export default function Navbar(props) {
//   return (
//     <div className="navbar navbar-dark bg-primary mb-3">
//       <div className="container-fluid">
//         {props.user ? (
//             <div style={{width: '100%'}} className="nav-item d-flex flex-row justify-content-between" >
//                 <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/'>Home</Link>
//                 <h1 className="navbar-brand" style={{height: '1vh'}}>Yolo Trader</h1>
//                 <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/' onClick={() => handleLogout(props)} >Logout</Link>
//             </div>
//           ) : (
//               <div>
//                   <Link to='/signup'>Signup</Link>
//                   <Link to='/login'>Login</Link>
//               </div>
//             )}
//       </div>
//     </div>
//   )
// }

export default function Navbar(props) {
  return (
      <nav >
        {props.user ? (
          <div className="navbar navbar-light" style={{backgroundColor: "#9b9fb0"}}>
            <div style={{width: '100%'}} className="nav-item d-flex flex-row justify-content-between" >
                <Link className='navbar-text' style={{color: 'white', textDecoration: 'none'}} to='/'>Home</Link>
                {/* <h1 className="navbar-brand" style={{height: '1vh', color: 'white'}}>Yolo Trader</h1> */}
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
