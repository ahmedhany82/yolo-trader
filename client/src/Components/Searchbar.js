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
  }


  render() {

    return (
      <div>
        <form style={{width:'100%', marginBottom: '50px'}} autoComplete="off">
          <div className="form-group">
              <label className="ml-3" htmlFor="search"></label>
              <input className="form-control" style={{width:'90%', height: '25px', marginLeft: '20px', backgroundColor:'lightgrey'}}
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
    </div>
    )

  }
}
