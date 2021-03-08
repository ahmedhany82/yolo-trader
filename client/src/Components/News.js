import React, { Component } from 'react'
import axios from 'axios'


export default class News extends Component {

  state = {
    news: []
  }

  componentDidMount() {
    const ticker = this.props.ticker;
    axios.get(`https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/3?token=${process.env.REACT_APP_IEXTEST_KEY}`).then(response => {
      this.setState({
        news: response.data
      })
    }).catch(err => {
      console.log("Error while fetching the news from API", err);
    });
  }

  render() {
    if(this.props.flag) {
      if(this.state.news.length === 0) {return <h1>Loading...</h1>}
      let newsList = this.state.news.map((article,index) => {
        return (
          <div key={index} className="mt-3 mb-3">
              <div style={{maxWidth: '30vw'}} className="d-flex flex-row justify-content-start">
                  <img style={{height: "8vh", width: "8vw"}} className="ml-5 mr-2" src={article.url} alt=""/>
                  <div className="d-flex flex-column justify-content-center align-self-center">
                      <a href={article.url} target="_blank" rel="noreferrer"><h5>{article.headline}</h5></a>
                      <p>{article.source}</p>
                      <span style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "15vw",
                        display: "block",
                        overflow: "hidden",
                      }}>{article.summary}</span>
                  </div>
              </div>
          </div>
          )
      })
      return (
        <div>
          <h3 className="ml-5 mt-3">News</h3>
          <div>
            {newsList}
          </div>
        </div>
      )
    } else {
      return (
        <>
        </>
      )      
    }
  }
}
