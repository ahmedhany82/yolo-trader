import React, { Component } from 'react'


export default class StockInfo extends Component {

  /* Reused from https://stackoverflow.com/a/55987576 */
  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  }

  render() {
      let adjustedMarketCap = this.formatCash(this.props.marketCap)
      return (
        <div style={{width: "50vw", color: 'white'}} className="ml-5">
            <h3 className="mt-5 mb-3">Summary</h3>
            <div className="d-flex flex-row justify-content-between align-items-stretch mt-4">
                <div style={{height: '18vh' }} className="d-flex flex-column justify-content-between align-items-start">
                  <p><strong>Previous Close:</strong><span style={{marginLeft: '20px'}}>{this.props.previousClose}</span></p>
                  <p><strong>52 Week Low:</strong><span style={{marginLeft: '33px'}}>{this.props.week52Low}</span></p>
                  <p><strong>PE Ratio (TTM):</strong><span style={{marginLeft: '20px'}}>{this.props.peRatio}</span></p>
                </div>
                <div style={{height: '18vh' }} className="d-flex flex-column justify-content-between align-items-start">
                  <p><strong>Market Cap:</strong><span style={{marginLeft: '33px'}}>{adjustedMarketCap}</span></p>
                  <p><strong>52 Week High:</strong><span style={{marginLeft: '20px'}}>{this.props.week52High}</span></p>
                  <p><strong>YtD Change:</strong><span style={{marginLeft: '33px'}}>{this.props.ytdChange} %</span></p>
                </div>
            </div>

        </div>
      )  
  }
}
