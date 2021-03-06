import React, { Component } from 'react'
import axios from 'axios';
import Chart from "chart.js";
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
    chartRange: 'ytd',
    // lastPrice: undefined, //this is last trade use https://finnhub.io/api/v1/quote?symbol=SPCE&token= for closing price
    // socket: new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_KEY}`),
    displayOrderComponent: false,
    orderType: undefined
  }

  componentDidMount() {

    this.setState({
      myChartRef: this.chartRef.current.getContext("2d")
    })
    
    axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/${this.state.ticker}/quote?displayPercent=true&token=${process.env.REACT_APP_IEXTEST_KEY}`).then(response => {
      const data = response.data;
      this.setState({
        companyName: data.companyName,
        latestPrice: data.latestPrice.toFixed(2),
        change: data.change.toFixed(2),
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

    // this.state.socket.onopen = () => {
    //   this.state.socket.send(JSON.stringify({'type':'subscribe', 'symbol': `${this.state.ticker}`}));
    // };

    // this.state.socket.onmessage = event => {
    //     if(JSON.parse(event.data)['data'] !== undefined) {
    //       JSON.parse(event.data)['data'].map(element => {
    //         let price = element.p;
    //         this.setState({
    //           lastPrice: price.toFixed(2),
    //         });
    //       });  
    //   }
    // };
 }

  chartUpdate() {
      axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/${this.state.ticker}/batch?token=${process.env.REACT_APP_IEXTEST_KEY}&types=chart,quote&range=${this.state.chartRange}`).then(response => {
        let dates = response.data.chart.map(element => {
          return element.date;
        })
        let prices = response.data.chart.map(element => {
          return element.close;
        })
        this.setState({
          data: prices,
          labels: dates, 
        }, () => {
          const { data, labels } = this.state;
          const maxYValue = Math.max(...data);
          if(this.state.myChart) {this.state.myChart.destroy()}; /* Destroy previous chart if it exists */
          
          this.state.myChart = new Chart(this.state.myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "",
                        backgroundColor: 'grey',
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
                  labels: {
                    fontColor: 'white'
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                      display: false,
                      ticks: {
                          display: false
                      }
                  }],
                  yAxes: [{
                    ticks: {
                     suggestedMax: maxYValue+(0.1*maxYValue),
                     fontColor: "white",
                     },
                     gridLines: {
                       color: 'white'
                     }
                   }]
              }
            }
          });

        })
      }).catch(err => {
        console.log(err)
      })
  }

  // componentWillUnmount() {
  //   let symbol = this.state.symbol;
  //   this.state.socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}));
  // }

  handleChartChange = event => {
    const range = event.target.name;
    this.setState({
      chartRange: range
    }, () => {
      this.chartUpdate() 
    });
  }

  handleOrder = event => {
    const orderType = event.target.name;
    this.setState({
      displayOrderComponent: true,
      orderType: orderType
    })
  }

  handleClose = event => {
    this.setState({
      displayOrderComponent: false
    })
  }


  render() {
    let absoluteChange = Math.abs(this.state.change);
    return (
       <div style={{height: '100vh', backgroundColor: '#434756'}}>
          <div className="d-flex flex-row">
              <div>
                  <div className="d-flex flex-row mt-3" >
                    <div className="ml-5">
                      <h3 style={{marginBottom: '0px', paddingTop: '15px', color: 'white'}}>{this.state.ticker}</h3>
                      <p style={{color:'grey', paddingLeft: "4px", marginBottom: '0px'}}>{this.state.companyName}</p>
                    </div>
                    <div style={{width: '32vw', height: '10vh'}} className="d-flex flex-row justify-content-between align-items-center ml-5">
                      <h1 style={{color: 'white'}}>${this.state.latestPrice}</h1>
                      {/* <h1>${this.state.lastPrice}</h1> */}
                      <div className="d-flex flex-row" style={{width: '21vw'}}>
                        <h4 style={(this.state.change < 0)? {color: '#ff0000', marginRight: '5px'}: {color: '#00ff00', marginRight: '5px'}}>{this.state.change > 0? '+': '-'}{absoluteChange}</h4>
                        <h4 style={(this.state.changePercent < 0)? {color: '#ff0000'}: {color: '#00ff00'}} >({this.state.changePercent}%)</h4>
                      </div>
                    </div>
                    
                  </div>
                  <div style={{width: "70vw"}} className="ml-1">
                    <div className="d-flex justify-content-end">
                      <div style={{width: "15vw"}} className="btn-group me-2 mb-1" role="group" aria-label="Second group">
                          <button onClick={this.handleChartChange} name="1d" type="button" className="btn btn-secondary">1D</button>
                          <button onClick={this.handleChartChange} name="1m" type="button" className="btn btn-secondary">1M</button>
                          <button onClick={this.handleChartChange} name="ytd" type="button" className="btn btn-secondary">YTD</button>
                          <button onClick={this.handleChartChange} name="1y" type="button" className="btn btn-secondary">1Y</button>
                      </div>
                    </div>
                    <div >
                          <canvas style={{width: "70vw", height: "40vh"}} id="myChart" ref={this.chartRef}/>
                    </div>
                    <StockInfo 
                        previousClose={this.state.previousClose}
                        marketCap={this.state.marketCap}
                        peRatio={this.state.peRatio}
                        week52High={this.state.week52High}
                        week52Low={this.state.week52Low}
                        ytdChange = {this.state.ytdChange}/>
                  </div>
              </div>
              <div style={{width: "28vw"}} className="mt-4 d-flex flex-column justify-content-start align-items-center">
                <div>
                  <button onClick={this.handleOrder} style={{width: "8vw", backgroundColor: '#3bb300', color: 'white'}} name="buy" type="button" className="btn btn-success btn-lg mr-2">Buy</button>
                  <button onClick={this.handleOrder} style={{width: "8vw", backgroundColor: '#e60000', color: 'white'}} name="sell" type="button" className="btn btn-danger btn-lg"><strong>Sell</strong> </button>
                </div>
                <OrderDetails flag={this.state.displayOrderComponent} orderType={this.state.orderType} user={this.props.user} ticker={this.state.ticker} callback={this.handleClose}/>
                <News ticker={this.state.ticker} flag={!this.state.displayOrderComponent}/>
              </div>
          </div>        
        </div>
    )
  }
}
