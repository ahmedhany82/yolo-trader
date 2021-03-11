import React, { Component } from 'react'
import axios from 'axios'


export default class News extends Component {

  state = {
    news: []
  }

  componentDidMount() {
    const ticker = this.props.ticker;
    // axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/${ticker}/news/last/3?token=${process.env.REACT_APP_IEXTEST_KEY}`).then(response => {
    //   this.setState({
    //     news: response.data
    //   })
    // }).catch(err => {
    //   console.log("Error while fetching the news from API", err);
    // });
    axios.get(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2021-03-08&to=2021-03-09&token=${process.env.REACT_APP_FINNHUB_KEY}`, { json: true }).then(res => {
        this.setState({
          news: res.data.slice(0,3)
        })
      }).catch(err => {
        console.log("Error while fetching the news from API", err);
      });
  }

  render() {
    if(this.props.flag) {
      if(this.state.news.length === 0) {
        //return <h1>Loading...</h1>
        return <div style={{height: "30vh"}} className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        </div> 
      }
      let newsList = this.state.news.map((article,index) => {
        return (
          <div key={index} className="mt-3 mb-3">
              {/* <div style={{maxWidth: '30vw'}} className="d-flex flex-row justify-content-start"> */}
              <div style={{width: '30vw'}} className="d-flex flex-row justify-content-start">
                  <img style={{height: "8vh", width: "8vw"}} className="ml-5 mr-2" src={article.image} alt=""/>
                  <div className="d-flex flex-column justify-content-center align-self-center">
                      <a href={article.url} target="_blank" rel="noreferrer"><h5>{article.headline}</h5></a>
                      {/* <p>{article.source}</p> */}
                      <span style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "15vw",
                        height: "8vh",
                        display: "block",
                        overflow: "hidden"
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
