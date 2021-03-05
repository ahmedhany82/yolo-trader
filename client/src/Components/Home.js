import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';

export default class Home extends Component {


  render() {
    return (
      <div>
        {this.props.user ? (
          <>
            <h1>A user is currently logged in</h1>
            <Searchbar/>
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
      </div>
    )
  }
}
