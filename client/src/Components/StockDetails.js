import React, { Component } from 'react'
import axios from 'axios';
import Chart from "chart.js";

export default class StockDetails extends Component {

  chartRef = React.createRef();

  state = {
    stock: [],
    labels: [],
    data: []
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const ticker = this.props.match.params.ticker;
    
    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=${process.env.REACT_APP_KEY}`).then(response => {
      console.log(response)
    }).catch(err => {
        console.log(err)
    })

    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/batch?token=${process.env.REACT_APP_KEY}&types=chart,quote&range=1w`).then(response => {
      console.log(response.data.chart)
      let dates = response.data.chart.map(element => {
        return element.date;
      })
      let prices = response.data.chart.map(element => {
        return element.close;
      })
      this.setState({
        data: prices,
        labels: dates
      }, () => {
        const { data, labels } = this.state;
        new Chart(myChartRef, {
          type: "line",
          data: {
              //Bring in data
              labels: ["2021-02-26", "2021-03-01", "2021-03-02", "2021-03-03", "2021-03-04"],
              datasets: [
                  {
                      label: "Sales",
                      data: [678.9, 718.93, 707.49, 658.9, 647.38] //this.state.data,
                  }
              ]
          },
          options: {
              //Customize chart options
          }
        });
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <h1>This is the StockDetails page</h1> 
        <div>
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
        </div>
      </div>
    )
  }
}
