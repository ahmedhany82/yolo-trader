import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';
import Portfolio from './Portfolio';

export default class Home extends Component {


  render() {
    return (
      <div className="container-fluid">
        {this.props.user ? (
          <>
            <div class="row">
              <div class="col">
                <h1 className="ml-3">Welcome {this.props.user.username}</h1>
                <Searchbar user={this.props.user}/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Portfolio user={this.props.user}/>
              </div>           
              <div class="col">
                <Portfolio user={this.props.user}/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Portfolio user={this.props.user}/>
              </div>           
              <div class="col">
                <Portfolio user={this.props.user}/>
              </div>
            </div>            
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
