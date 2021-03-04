import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { Route, Redirect} from 'react-router-dom';

export default class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Route exact path='/signup' render={props => <Signup setUser={this.setUser} {...props} />} />
        <Route exact path='/login' render={props => <Login setUser={this.setUser} {...props} />} />
      </div>
    )
  }
}
