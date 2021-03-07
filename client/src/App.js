import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import StockDetails from './Components/StockDetails';
import { Route, Switch, Redirect} from 'react-router-dom';

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
    console.log("App render is called")
    return (
      <div>
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route exact path='/' render={props => <Home user={this.state.user} {...props} />} />
          <Route exact path='/signup' render={props => <Signup setUser={this.setUser} {...props} />} />
          <Route exact path='/login' render={props => <Login setUser={this.setUser} {...props} />} />
          {/* <Route exact path='/symbols/:ticker' render={props => <StockDetails user={this.state.user} {...props} />} /> */}
          <Route exact path='/symbols/:ticker' component={props => <StockDetails user={this.state.user} {...props} />} />
        </Switch>
      </div>
    )
  }
}
