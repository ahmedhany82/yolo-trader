import React, { Component } from 'react';
import Chart from "chart.js";

export default class PieChart extends Component {

  chartRef = React.createRef();

  state = {
    myChartRef: undefined,
  }

  componentDidMount() {
    this.state.myChartRef = this.chartRef.current.getContext("2d");
    this.state.myChart = new Chart(this.state.myChartRef, {
      type: "pie",
      data: {
          datasets: [
              {
                data: [10, 20, 30],
                backgroundColor: [ 'red', 'green', 'blue']
              }
          ],
          labels: [
            'Red',
            'Yellow',
            'Blue'
          ]
      },
      options: {

      }
    });
  }


  render() {
    return (
      <div>
        <h3>Here goes the Pie Chart</h3>
        <div >
            <canvas  id="myChart" ref={this.chartRef}/>
        </div>
      </div>
    )
  }
}
