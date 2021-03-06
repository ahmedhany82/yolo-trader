import React, { Component } from 'react'
import axios from 'axios';
import Chart from "chart.js";

// const socket = new WebSocket('wss://ws.finnhub.io?token=c0uhttn48v6r6g5764c0');

export default class StockDetails extends Component {

  chartRef = React.createRef();

  state = {
    symbol: undefined,
    companyName: undefined,
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
    socket: new WebSocket('wss://ws.finnhub.io?token=c0uhttn48v6r6g5764c0'),
    diff: undefined,
  }

  componentDidMount() {

    console.log("Component did mount is called")
    const myChartRef = this.chartRef.current.getContext("2d");
    const ticker = this.props.match.params.ticker;
    
    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=${process.env.REACT_APP_KEY}`).then(response => {
      const data = response.data;
      this.setState({
        symbol: data.symbol,
        companyName: data.companyName,
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

    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/batch?token=${process.env.REACT_APP_KEY}&types=chart,quote&range=ytd`).then(response => {
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

    // const socket = new WebSocket('wss://ws.finnhub.io?token=c0uhttn48v6r6g5764c0');
    //const socket = new WebSocket('wss://ws.finnhub.io?token=sandbox_c0uhttn48v6r6g5764cg');
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

  render() {
    return (
      <div>
          <h1>This is the StockDetails page</h1> 
          <div style={{display:'flex'}}>
            <div style={{width: "70vw", height: "20vh"}}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
            <div>
              <button>1M</button>
              <button>1W</button>
              <button>1D</button>
              <button>YTD</button>
            </div>
            <div>
              <h1>{this.state.symbol}</h1>
              <p>{this.state.companyName}</p>
              <p>{this.state.lastPrice}</p>
            </div>
          </div>
      </div>
    )
  }
}
