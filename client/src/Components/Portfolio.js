
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
          <th scope="row"><Link to={`/symbols/${element.ticker}`}><p style={{color: 'white'}} className="fw-bolder">{element.ticker}</p></Link></th>
          <td style={{color: 'white'}}>{element.count}</td>
          <td style={{color: 'white'}}>{this.props.symbolsPrice[element.ticker]}</td>
          <td style={{color: 'white'}}>{formattedValue}</td>
          <td style={(profitloss < 0)? {color: '#ff0000'}: {color: '#00ff00'}}><strong>{profitloss}%</strong></td>
          <td style={(change < 0)? {color: '#ff0000'}: {color: '#00ff00'}}><strong>{change > 0? '+': '-'}{absoluteChange}</strong></td>
        </tr>
      )
    }) : [];

    return (
      <div style={{width: "45vw", height: "auto"  }} className="ml-3 border p-3 border-white shadow p-3 mb-5 bg-body rounded">
        <h4 className="ml-3 mb-3" style={{width: "40vw", position: 'relative', zIndex: '1'}}>Portfolio</h4>
        <table style={{width: "40vw", position: 'relative', textAlign: 'center'}} className="table table-hover table-sm ml-3 ">
            <thead>
              <tr style={{color: 'white'}}>
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
