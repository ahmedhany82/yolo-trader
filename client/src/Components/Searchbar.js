import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class Searchbar extends React.Component {

  state = {
    query: '',
    tickers: []
  }

  handleSearch = event => {
    const query = event.target.value;
    this.setState({
        query: query
    })
    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_KEY}`).then(response => {
      this.setState({
          tickers: response.data.bestMatches
          })      
    }).catch(err => {
        console.log(err)
    })
    // console.log(process.env.ALPHAVANTAGE_KEY)
    // axios.get(`https://finnhub.io/api/v1/search?q=${query}&token=${process.env.FINNHUB_KEY}`, { json: true },).then((err, res, body) => {
    //   if (err) { return console.log(err); }
    //   console.log(body.url);
    //   console.log(body.explanation);
    // })
  }


  render() {
      let tickersList = this.state.tickers.map(ticker => {
        return (
          <div>
            <Link to={`/symbols/${ticker['1. symbol']}`} ><p>{ticker['1. symbol']}</p></Link>
            {/* <p>{ticker['1. symbol']}</p> */}
            <p style={{color: "grey"}}>{ticker['2. name']}</p>
          </div>
        )
      })  
    return (
      <div>
      <h1>This is the Search Bar</h1>
        <form style={{width:'100%', marginBottom: '50px'}}>
          <div className="form-group">
              <label className="ml-3" htmlFor="search">Search By Symbol</label>
              <input className="form-control" style={{width:'90%', height: '25px', marginLeft: '20px'}}
                type="text"
                name="search"
                id="search"
                value={this.state.query}
                onChange={this.handleSearch}
              />
          </div>
          </form>
          <div>
              {tickersList}
          </div>
    </div>
    )

  }
}
