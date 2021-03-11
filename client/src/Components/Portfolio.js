
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Portfolio extends Component {

 
  /* Reused from https://stackoverflow.com/a/55987576 */
  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  render() {
    const portfolioList = (this.props.portfolio && this.props.portfolio.length !== 0)? this.props.portfolio.map((element,index) => {
      let value = (element.count * this.props.symbolsPrice[element.ticker]).toFixed(2);
      let formattedValue = this.formatCash(value);
      let change = (value - (element.count * element.averagePrice)).toFixed(2);
      let absoluteChange = Math.abs(change);
      let profitloss = (((value - (element.count * element.averagePrice))/(element.count * element.averagePrice)) *100).toFixed(2) ;
      return (
        <tr key={index}>
          {/* <th scope="row">{element.ticker}</th> */}
          <th scope="row"><Link to={`/symbols/${element.ticker}`}><p>{element.ticker}</p></Link></th>
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
