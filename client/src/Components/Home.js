import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';
import Portfolio from './Portfolio';
import PieChart from './PieChart';
import MostActive from './MostActive';
import NewsHomePage from './NewsHomePage';

import { getPortfolio, getbalance } from '../services/order';
import axios from 'axios';

export default class Home extends Component {

  state = {
    portfolio: [],
    symbolsPrice: {},
    balance: 0
  }

  /* Reused from https://stackoverflow.com/a/55987576 */
  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  componentDidMount() {      
    if(this.props.user) {
        getPortfolio(this.props.user._id).then(portfoliofromDB => {
          const symbols = portfoliofromDB.map(element => {
            return element.ticker;
          })      
          axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/market/batch?symbols=${symbols.join(',')}&types=quote&filter=latestPrice&token=${process.env.REACT_APP_IEXTEST_KEY}`).then(res => {
            const symbolsPriceMap = {}
            for(let ticker in res.data) {
              symbolsPriceMap[ticker] = res.data[ticker]['quote']['latestPrice'].toFixed(2);
            }
            this.setState({
              symbolsPrice: symbolsPriceMap,
            })
          }).catch(err => {
            console.log(err);
          });
          
          this.setState({
            portfolio: portfoliofromDB,
          })
        }).catch(err => {
          console.log(err);
        })

        getbalance(this.props.user._id).then(res => {
          this.setState({
            balance: res
          })
        }).catch(err => {
          console.log(err);
        });
      }
  }


  render() {
    let formattedBalance = this.formatCash(this.state.balance);
    return (
      <div className="container-fluid">
        {this.props.user ? (
          <div style={{backgroundColor: '#434756', color: 'white'}}>  
            <div className="row">
              <div className="col">
                <div className="d-flex flex-row justify-content-between align-items-center ml-1 mr-2">
                  <h3 className="ml-3">Welcome {this.props.user.username}</h3>
                  <h4>Balance: ${formattedBalance}</h4>
                </div>
                <Searchbar user={this.props.user}/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Portfolio user={this.props.user} portfolio={this.state.portfolio} symbolsPrice={this.state.symbolsPrice}/>
              </div>           
              <div className="col d-flex flex-row justify-content-center align-items-stretch">
                <PieChart user={this.props.user} portfolio={this.state.portfolio} symbolsPrice={this.state.symbolsPrice}/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MostActive/>
              </div>           
              <div className="col">
                <NewsHomePage user={this.props.user}/>
              </div>
            </div>            
          </div>
        ) : (
            <div style={{height: '100vh'}} className="d-flex flex-row justify-content-between align-items-center">
              <div style={{height: '100vh', width: '50vw', backgroundColor: 'lightblue'}} className="d-flex flex-column justify-content-center align-items-center">
                  <div style={{height: '50vh', width: '35vw'}} className="d-flex flex-column justify-content-around"> 
                      <div>
                        <h1 style={{color: 'white', textShadow: '2px 2px #ebebe0'}} className="display-4 fw-bolder">YOLO Trader</h1>
                        <h3 style={{color: 'white'}} className="fw-bolder">You Only Live Once! Invest your money!</h3>
                      </div>
                      <div style={{width: '20vw', listStyleType: 'none'}} className="d-flex flex-row justify-content-between align-items-center">
                        <li style={{
                            textAlign: 'center',
                            width: '6vw',
                            height: '8vh',
                            backgroundColor: 'rgb(203 235 232 / 94%)',
                            borderRadius: '25px',
                            flexDirection: 'column',
                            padding: '20px',
                            margin: '17px',
                        }}>
                          <Link to='/signup'>Signup</Link>
                        </li>
                        <li style={{
                            textAlign: 'center',
                            width: '6vw',
                            height: '8vh',
                            backgroundColor: 'rgb(203 235 232 / 94%)',
                            borderRadius: '25px',
                            flexDirection: 'column',
                            padding: '20px',
                            margin: '17px',
                        }}>
                          <Link to='/login'>Login</Link>
                        </li>
                      </div>
                  </div>
              </div>
              <div style={{height: '100vh', width: '50vw', backgroundColor: 'lightgrey'}} className="d-flex flex-column justify-content-center align-items-center">
                <div  className="text-center">
                  <img className="mx-auto" style={{height: '80vh', width: '40vw'}} src="https://images.unsplash.com/photo-1612010167102-d1e8f83833e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-fluid" alt="..."></img>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}
