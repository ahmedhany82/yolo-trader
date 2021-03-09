import React, { Component } from 'react'

export default class Portfolio extends Component {
  render() {
    return (
      <div style={{width: "45vw" }} className="ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
        <h3 className="ml-3" style={{width: "40vw", position: 'relative', zIndex: '1', textAlign: 'center'}}>Portfolio</h3>
        <table style={{width: "40vw", position: 'relative', textAlign: 'center'}} class="table table-hover table-sm ml-3 ">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Position</th>
                <th scope="col">Last Price</th>
                <th scope="col">Value</th>
                <th scope="col">Gain/Loss %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">TSLA</th>
                <td>630</td>
                <td>630</td>
                <td>12%</td>
                <td>130</td>
              </tr>
              <tr>
                <th scope="row">SPCE</th>
                <td>20</td>
                <td>20</td>
                <td>20%</td>
                <td>190</td>
              </tr>
              <tr>
                <th scope="row">AAPL</th>
                <td>20</td>
                <td>20</td>
                <td>20%</td>
                <td>50</td>
              </tr>
              <tr>
                <th scope="row">PLTR</th>
                <td>35</td>
                <td>35</td>
                <td>10%</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
      </div>
    )
  }
}
