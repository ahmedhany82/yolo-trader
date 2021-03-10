import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar';
import Portfolio from './Portfolio';
import PieChart from './PieChart';

import { getPortfolio, getbalance } from '../services/order';
import axios from 'axios';

export default class Home extends Component {

  state = {
    portfolio: [],
    symbolsPrice: {},
    balance: 0
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
          console.log(res);
          this.setState({
            balance: res
          })
        }).catch(err => {
          console.log(err);
        });
      }
  }


  render() {
    return (
      <div className="container-fluid">
        {this.props.user ? (
          <>
            <div class="row">
              <div class="col">
                <h3 className="ml-3">Welcome {this.props.user.username}</h3>
                <h4>Balance: ${this.state.balance}</h4>
                <Searchbar user={this.props.user}/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Portfolio user={this.props.user} portfolio={this.state.portfolio} symbolsPrice={this.state.symbolsPrice}/>
              </div>           
              <div class="col">
                <PieChart user={this.props.user} portfolio={this.state.portfolio} symbolsPrice={this.state.symbolsPrice}/>
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
