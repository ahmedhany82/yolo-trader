// import axios from 'axios';
import React, { Component } from 'react'
// import { getPortfolio } from '../services/order';

export default class Portfolio extends Component {

  // state = {
  //   portfolio: [],
  //   symbolsPrice: {}
  // }

  /* Reused from https://stackoverflow.com/a/55987576 */
  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  // componentDidMount() {      
  //   getPortfolio(this.props.user._id).then(portfoliofromDB => {
  //     const symbols = portfoliofromDB.map(element => {
  //       return element.ticker;
  //     })      
  //     axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/market/batch?symbols=${symbols.join(',')}&types=quote&filter=latestPrice&token=${process.env.REACT_APP_IEXTEST_KEY}`).then(res => {
  //       const symbolsPriceMap = {}
  //       for(let ticker in res.data) {
  //         symbolsPriceMap[ticker] = res.data[ticker]['quote']['latestPrice'].toFixed(2);
  //       }
  //       this.setState({
  //         symbolsPrice: symbolsPriceMap,
  //       })
  //     }).catch(err => {
  //       console.log(err);
  //     });
      
  //     this.setState({
  //       portfolio: portfoliofromDB,
  //     })
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }


  render() {
    // const portfolioList = (this.state.portfolio.length !== 0)? this.state.portfolio.map(element => {
    //   let value = (element.count * this.state.symbolsPrice[element.ticker]).toFixed(2);
    //   let formattedValue = this.formatCash(value);
    //   let change = (value - (element.count * element.averagePrice)).toFixed(2);
    //   let absoluteChange = Math.abs(change);
    //   let profitloss = (((value - (element.count * element.averagePrice))/(element.count * element.averagePrice)) *100).toFixed(2) ;
    //   return (
    //     <tr>
    //       <th scope="row">{element.ticker}</th>
    //       <td>{element.count}</td>
    //       <td>{this.state.symbolsPrice[element.ticker]}</td>
    //       <td>{formattedValue}</td>
    //       <td style={(profitloss < 0)? {color: 'red'}: {color: 'green'}}>{profitloss}%</td>
    //       <td style={(change < 0)? {color: 'red'}: {color: 'green'}}>{change > 0? '+': '-'}{absoluteChange}</td>
    //     </tr>
    //   )
    // }) : [];

    const portfolioList = (this.props.portfolio && this.props.portfolio.length !== 0)? this.props.portfolio.map((element,index) => {
      let value = (element.count * this.props.symbolsPrice[element.ticker]).toFixed(2);
      let formattedValue = this.formatCash(value);
      let change = (value - (element.count * element.averagePrice)).toFixed(2);
      let absoluteChange = Math.abs(change);
      let profitloss = (((value - (element.count * element.averagePrice))/(element.count * element.averagePrice)) *100).toFixed(2) ;
      return (
        <tr key={index}>
          <th scope="row">{element.ticker}</th>
          <td>{element.count}</td>
          <td>{this.props.symbolsPrice[element.ticker]}</td>
          <td>{formattedValue}</td>
          <td style={(profitloss < 0)? {color: 'red'}: {color: 'green'}}>{profitloss}%</td>
          <td style={(change < 0)? {color: 'red'}: {color: 'green'}}>{change > 0? '+': '-'}{absoluteChange}</td>
        </tr>
      )
    }) : [];




    return (
      <div style={{width: "45vw", height: "35vh" }} className="ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
        <h4 className="ml-3" style={{width: "40vw", position: 'relative', zIndex: '1'}}>Portfolio</h4>
        <table style={{width: "40vw", position: 'relative', textAlign: 'center'}} className="table table-hover table-sm ml-3 ">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Position</th>
                <th scope="col">Last Price</th>
                <th scope="col">Market Value($)</th>
                <th scope="col">Gain/Loss %</th>
                <th scope="col">Total Change</th>
              </tr>
            </thead>
            <tbody>
              {portfolioList}
            </tbody>
          </table>
      </div>
    )
  }
}
