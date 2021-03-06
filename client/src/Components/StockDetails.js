import React, { Component } from 'react'
import axios from 'axios';
import Chart from "chart.js";


export default class StockDetails extends Component {

  chartRef = React.createRef();

  state = {
    myChartRef: undefined,
    symbol: undefined,
    companyName: undefined,
    change: undefined,
    latestPrice: undefined,
    changePercent: undefined,
    latestTime: undefined,
    lastPrice: undefined, //this is last trade use https://finnhub.io/api/v1/quote?symbol=SPCE&token= for closing price
    labels: [],
    data: [],
    week52High: undefined,
    week52Low: undefined,
    marketCap: undefined,
    peRatio: undefined,
    avgTotalVolume: undefined,
    ytdChange: undefined,
    previousClose: undefined,
    socket: new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_KEY}`),
    diff: undefined,
    chartRange: '1d'
  }

  chartUpdate() {
      const ticker = this.props.match.params.ticker;
      console.log(`chartUpdate() is called with range: ${this.state.chartRange}`)
      axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/batch?token=${process.env.REACT_APP_KEY}&types=chart,quote&range=${this.state.chartRange}`).then(response => {
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
          new Chart(this.state.myChartRef, {
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
                //Customize chart options
                hover: {
                  mode: "index",
                  intersect: false,
                },
                legend: {
                  display: false,
                },
            }
          });
        })
      }).catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {

    console.log("Component did mount is called")
    // const myChartRef = this.chartRef.current.getContext("2d");
    this.state.myChartRef = this.chartRef.current.getContext("2d");
    const ticker = this.props.match.params.ticker;
    
    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=${process.env.REACT_APP_KEY}`).then(response => {
    // axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=pk_476aa872c5f94e4e847ad136d6ebc2a8`).then(response => {
      const data = response.data;
      console.log(data)
      this.setState({
        symbol: data.symbol,
        companyName: data.companyName,
        latestPrice: data.latestPrice,
        change: data.change,
        changePercent: data.changePercent.toFixed(2),
        latestTime: data.latestTime,
        marketCap: data.marketCap,
        peRatio: data.peRatio,
        avgTotalVolume: data.avgTotalVolume,
        ytdChange: data.ytdChange,
        previousClose: data.previousClose,
        week52High: data.week52High,
        week52Low: data.week52Low,
        webSocket: undefined
      });
    }).catch(err => {
        console.log(err)
    })

    this.chartUpdate();
    //call one api, the chart one gets the quote at the end
    // axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/batch?token=${process.env.REACT_APP_KEY}&types=chart,quote&range=${this.state.chartRange}`).then(response => {
    //   console.log(response.data.chart)
    //   let dates = response.data.chart.map(element => {
    //     return element.date;
    //   })
    //   let prices = response.data.chart.map(element => {
    //     return element.close;
    //   })
    //   this.setState({
    //     data: prices,
    //     labels: dates
    //   }, () => {
    //     const { data, labels } = this.state;
    //     new Chart(myChartRef, {
    //       type: "line",
    //       data: {
    //           labels: labels,
    //           datasets: [
    //               {
    //                   label: "",
    //                   backgroundColor: 'rgb(173,216,230)',
    //                   borderColor: 'rgb(230,230,250)',
    //                   data: data
    //               }
    //           ]
    //       },
    //       options: {
    //           //Customize chart options
    //           hover: {
    //             mode: "index",
    //             intersect: false,
    //           },
    //           legend: {
    //             display: false,
    //           },
    //       }
    //     });
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })

    this.state.socket.onopen = () => {
      this.state.socket.send(JSON.stringify({'type':'subscribe', 'symbol': `${ticker}`}));
    };

    let difference = this.state.previousClose;
    this.state.socket.onmessage = event => {
        if(JSON.parse(event.data)['data'] !== undefined) {
          JSON.parse(event.data)['data'].map(element => {
            let price = element.p;
            this.setState({
              lastPrice: price,
              diff: price - this.state.previousClose
            });
          });  
      }
    };

    // const socket = new WebSocket('wss://ws.finnhub.io?token=');
    //const socket = new WebSocket('wss://ws.finnhub.io?token=');
      // socket.addEventListener('open', function (event) {
      //     socket.send(JSON.stringify({'type':'subscribe', 'symbol': `${ticker}`}))
      // });

      // socket.addEventListener('message', event => {
      //   //check if data is empty
      //     JSON.parse(event.data)['data'].map(element => {
      //       // console.log(element.p)
      //       let price = element.p;
      //       this.setState({
      //         lastPrice: price
      //       });
      //     });
      // });




    // var unsubscribe = function(symbol) {
    //   socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    // }
    // unsubscribe('TSLA')
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
  // this.chartUpdate();
  }

  render() {
    return (
      <div>
          <div className="d-flex flex-column" >
            <div className="ml-5">
              <h3 style={{marginBottom: '0px'}}>{this.state.symbol}</h3>
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
            <div style={{width: "70vw"}}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
          </div>
      </div>
    )
  }
}
