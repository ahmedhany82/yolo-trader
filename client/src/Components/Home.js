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
          <>
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
              <div className="col">
                <PieChart user={this.props.user} portfolio={this.state.portfolio} symbolsPrice={this.state.symbolsPrice}/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MostActive/>
              </div>           
              <div className="col">
                {/* <Portfolio user={this.props.user}/> */}
                <NewsHomePage user={this.props.user}/>
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
