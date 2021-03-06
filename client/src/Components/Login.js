import React, { Component } from 'react'
import { login } from '../services/auth';

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password)
      .then(user => {
        if (user.message) {
          this.setState({
            message: user.message,
            username: '',
            password: ''
          })
        } else {
          this.props.setUser(user);
          this.props.history.push('/');
        }
      })
  }
  render() {
    return (
      <div style={{backgroundColor: '#434756', height: "100vh"}} className="d-flex flex-column justify-content-center align-items-center">
        <div style={{height: '42vh', weight: '30vw'}} className="d-flex flex-column justify-content-between">
        <h2 style={{color: 'white'}}>Login</h2>
        <form onSubmit={this.handleSubmit} style={{height: '80%'}}>
        <div style={{height: '100%'}}className="form-group d-flex flex-column justify-content-around">
            <div>
              <label className="form-label" htmlFor="username"><span style={{color: 'white'}}>Username:</span> </label>
              <input className="form-control"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
              />              
            </div>
            <div>
              <label className="form-label" htmlFor="password"><span style={{color: 'white'}}>Password:</span></label>
              <input className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
              />
            </div>
            <div>
              <button className="btn btn-light mt-4 mb-3" type="submit">Log in</button>
              {this.state.message && (
                <h4 style={{color: 'white'}}>{this.state.message}</h4>
              )}
            </div>
        </div>
        </form>
        </div>
      </div>      
    )
  }
}