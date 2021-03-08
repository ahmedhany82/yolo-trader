import React from 'react';
import SearchResults from "./SearchResults";
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
      // let tickersList = this.state.tickers.map(ticker => {
      //   return (
      //     <div>
      //       <Link to={`/symbols/${ticker['1. symbol']}`} ><p>{ticker['1. symbol']}</p></Link>
      //       {/* <p>{ticker['1. symbol']}</p> */}
      //       <p style={{color: "grey"}}>{ticker['2. name']}</p>
      //     </div>
      //   )
      // })  
    return (
      <div>
        <form style={{width:'100%', marginBottom: '50px'}} autoComplete="off">
          <div className="form-group">
              <label className="ml-3" htmlFor="search"></label>
              <input className="form-control" style={{width:'90%', height: '25px', marginLeft: '20px'}}
                type="text"
                name="search"
                id="search"
                value={this.state.query}
                placeholder="Search by Symbol"
                onChange={this.handleSearch}
              />
              <SearchResults tickers={this.state.tickers}/>
          </div>
        </form>
        
          {/* <div>
              {tickersList}
          </div> */}
    </div>
    )

  }
}
