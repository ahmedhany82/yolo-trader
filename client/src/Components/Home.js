import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';

export default class Home extends Component {


  render() {
    return (
      <div>
        {this.props.user ? (
          <>
            <h1 className="ml-3">Welcome {this.props.user.username}</h1>
            <Searchbar user={this.props.user}/>
            <h1 className="ml-3" style={{position: 'absolute', zIndex: '1'}}>This is a test</h1>
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
