import React, { Component } from 'react';
import Chart from "chart.js";

export default class PieChart extends Component {

  chartRef = React.createRef();

  state = {
    myChartRef: undefined,
  }

  componentDidMount() {
    this.setState({
      myChartRef: this.chartRef.current.getContext("2d")
    })
  }

  render() {
    if(this.state.myChartRef && this.props.symbolsPrice && this.props.portfolio.length !== 0) 
    {
      const labels = Object.keys(this.props.symbolsPrice);  
      const valueArray = this.props.portfolio.map(element => {
        return ((element.count) * this.props.symbolsPrice[element.ticker])
      })
      const sum = valueArray.reduce((a, b) => a + b, 0);
      const data = valueArray.map(element => {
        return ((element / sum)*100).toFixed(2);
      })
      let colorsArray = this.props.portfolio.map(element => {
        let r = Math.floor(Math.random() * 200);
        let g = Math.floor(Math.random() * 200);
        let b = Math.floor(Math.random() * 200);
        return('rgb(' + r + ', ' + g + ', ' + b + ')')
      })

      this.state.myChart = new Chart(this.state.myChartRef, {
        type: "pie",
        data: {
            datasets: [
                {
                  data: data,
                  backgroundColor: colorsArray, 
                }
            ],
            labels: labels
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }

    return (
      <div style={{width: "45vw", height: "35vh"}} className="ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
        <h4>Portfolio Distribution %</h4>
        <div >
            <canvas style={{width: "40vw", height: "23vh"}} id="myChart" ref={this.chartRef}/>
        </div>
      </div>
    )
  }
}
