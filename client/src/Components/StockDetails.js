import React, { Component } from 'react'
import axios from 'axios';
import Chart from "chart.js";
import Searchbar from "./Searchbar"
import News from "./News"
import OrderDetails from "./OrderDetails"
import StockInfo from "./StockInfo"

export default class StockDetails extends Component {

  chartRef = React.createRef();

  state = {
    ticker: this.props.match.params.ticker,
    myChartRef: undefined,
    myChart: undefined,
    companyName: undefined,
    latestPrice: undefined,
    change: undefined,
    changePercent: undefined,
    latestTime: undefined,
    marketCap: undefined,
    peRatio: undefined,
    avgTotalVolume: undefined,
    ytdChange: undefined,
    previousClose: undefined,
    week52High: undefined,
    week52Low: undefined,
    labels: [],
    data: [],
    chartRange: '1d',
    lastPrice: undefined, //this is last trade use https://finnhub.io/api/v1/quote?symbol=SPCE&token= for closing price
    socket: new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_KEY}`)
  }

  componentDidMount() {

    console.log("Component did mount is called")

    // const myChartRef = this.chartRef.current.getContext("2d");
    this.state.myChartRef = this.chartRef.current.getContext("2d");

    
    axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/quote?displayPercent=true&token=${process.env.REACT_APP_IEXTEST_KEY}`).then(response => {
      const data = response.data;
      this.setState({
        companyName: data.companyName,
        latestPrice: data.latestPrice,
        change: data.change,
        changePercent: data.changePercent.toFixed(2),
        latestTime: data.latestTime,
        marketCap: data.marketCap,
        peRatio: data.peRatio,
        avgTotalVolume: data.avgTotalVolume,
        ytdChange: data.ytdChange.toFixed(2),
        previousClose: data.previousClose,
        week52High: data.week52High,
        week52Low: data.week52Low,
      });
    }).catch(err => {
        console.log(err)
    })

    this.chartUpdate();

    this.state.socket.onopen = () => {
      this.state.socket.send(JSON.stringify({'type':'subscribe', 'symbol': `${this.state.ticker}`}));
    };

    this.state.socket.onmessage = event => {
        if(JSON.parse(event.data)['data'] !== undefined) {
          JSON.parse(event.data)['data'].map(element => {
            let price = element.p;
            this.setState({
              lastPrice: price,
            });
          });  
      }
    };
 }

  chartUpdate() {
      axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/batch?token=${process.env.REACT_APP_IEXTEST_KEY}&types=chart,quote&range=${this.state.chartRange}`).then(response => {
        let dates = response.data.chart.map(element => {
          return element.date;
        })
        let prices = response.data.chart.map(element => {
          return element.close;
        })
        this.setState({
          data: prices, /* The axis should depend on 52-week high */
          labels: dates, 
        }, () => {
          const { data, labels } = this.state;
          
          if(this.myChart) {this.myChart.destroy()}; /* Destroy previous chart if it exists */
          
          this.myChart = new Chart(this.state.myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "",
                        backgroundColor: 'rgb(173,216,230)',
                        borderColor: 'rgb(230,230,250)',
                        data: data
                    }
                ]
            },
            options: {
                hover: {
                  mode: "index",
                  intersect: false,
                },
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
            }
          });
        })
      }).catch(err => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    console.log("component will unmount is called")
    let symbol = this.state.symbol;
    this.state.socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}));
    alert('The component is going to be unmounted');
  }

  handleChartChange = event => {
    const range = event.target.name;
    this.setState({
      chartRange: range
    }, () => {
      this.chartUpdate() 
    });
  }


  render() {
    return (
      <div>
          <div className="d-flex flex-row">
              <div>
                  <div className="d-flex flex-row" >
                    <div className="ml-5">
                      <h3 style={{marginBottom: '0px', paddingTop: '15px'}}>{this.state.ticker}</h3>
                      <p style={{color:'grey', paddingLeft: "4px", marginBottom: '0px'}}>{this.state.companyName}</p>
                    </div>
                    <div style={{width: '32vw', height: '10vh'}} className="d-flex flex-row justify-content-between align-items-center ml-5">
                      <h1>${this.state.latestPrice}</h1>
                      <div className="d-flex flex-row" style={{width: '21vw'}}>
                        <h4 style={(this.state.change < 0)? {color: 'red', marginRight: '5px'}: {color: 'green', marginRight: '5px'}}>{this.state.change}</h4>
                        <h4 style={(this.state.changePercent < 0)? {color: 'red'}: {color: 'green'}} >({this.state.changePercent}%)</h4>
                      </div>
                    </div>
                    
                  </div>
                  <div style={{width: "70vw"}}>
                    <div className="d-flex justify-content-end">
                      <div style={{width: "15vw"}} class="btn-group me-2" role="group" aria-label="Second group">
                          <button onClick={this.handleChartChange} name="1d" type="button" class="btn btn-secondary">1D</button>
                          <button onClick={this.handleChartChange} name="1m" type="button" class="btn btn-secondary">1M</button>
                          <button onClick={this.handleChartChange} name="ytd" type="button" class="btn btn-secondary">YTD</button>
                          <button onClick={this.handleChartChange} name="1y" type="button" class="btn btn-secondary">1Y</button>
                      </div>
                    </div>
                    <div >
                          <canvas style={{width: "70vw", height: "40vh"}}
                              id="myChart"
                              ref={this.chartRef}
                              
                          />
                    </div>
                  </div>
              </div>
              <div style={{width: "30vw"}} className="mt-3 d-flex flex-column justify-content-start align-items-center">
                <div>
                  <button style={{width: "8vw"}} type="button" class="btn btn-success btn-lg mr-2">Buy</button>
                  <button style={{width: "8vw"}} type="button" class="btn btn-danger btn-lg">Sell</button>
                </div>
                <OrderDetails flag={true}/>
                <StockInfo flag={false}/>
                <div>
                  <h3 className="mt-5">Stock Information</h3>
                  <p>Previous Close: {this.state.previousClose}</p>
                  <p>Market Cap: {this.state.marketCap}</p>
                  <p>PE Ratio (TTM): {this.state.peRatio}</p>
                  <p>52 Week Range: {this.state.week52Low} - {this.state.week52High}</p>
                  <p>YtD Change: {this.state.ytdChange} %</p>
                </div>
              </div>
          </div>
          <News ticker={this.state.ticker}/>
      </div>
    )
  }
}
