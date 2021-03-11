import React, { Component } from 'react'
import { getPortfolio } from '../services/order';
import axios from 'axios'

export default class NewsHomePage extends Component {

    state = {
      news: []
    }

    componentDidMount() {      
      if(this.props.user) {
          getPortfolio(this.props.user._id).then(portfoliofromDB => {
            const symbols = portfoliofromDB.map(element => {
              return element.ticker;
            })
            if(symbols.length !== 0) {
              const ticker = symbols[Math.floor(Math.random() * symbols.length)]
              axios.get(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2021-03-08&to=2021-03-09&token=${process.env.REACT_APP_FINNHUB_KEY}`, { json: true }).then(res => {
                  this.setState({
                    news: res.data.slice(0,2)
                  })
                }).catch(err => {
                  console.log("Error while fetching the news from API", err);
                });  
            } else {
              axios.get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINNHUB_KEY}`, { json: true }).then(res => {
                this.setState({
                  news: res.data.slice(0,2)
                })
              }).catch(err => {
                console.log("Error while fetching the news from API", err);
              });
            }
          }).catch(err => {
            console.log(err);
          })
        }  
    }

    // componentDidMount() {      
    //   if(this.props.user) {
    //       getPortfolio(this.props.user._id).then(portfoliofromDB => {
    //         const symbols = portfoliofromDB.map(element => {
    //           return element.ticker;
    //         })
    //         const ticker = symbols[Math.floor(Math.random() * symbols.length)]
    //         axios.get(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2021-03-08&to=2021-03-09&token=${process.env.REACT_APP_FINNHUB_KEY}`, { json: true }).then(res => {
    //             this.setState({
    //               news: res.data.slice(0,2)
    //             })
    //           }).catch(err => {
    //             console.log("Error while fetching the news from API", err);
    //           });
    //       }).catch(err => {
    //         console.log(err);
    //       })
    //     }
    // }

  render() {
      if(this.state.news.length === 0) {
        return <div style={{height: "35vh"}} className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
      let newsList = this.state.news.map((article,index) => {
        return (
          <div key={index}>
              {/* <div style={{maxWidth: '30vw'}} className="d-flex flex-row justify-content-start"> */}
              <div style={{Width: '30vw'}} className="d-flex flex-row justify-content-start">
                  <img style={{height: "8vh", width: "8vw"}} className=" mr-2" src={article.image} alt=""/>
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
        <div style={{width: "45vw", height: "35vh"}} className="ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
          <h4 className="mb-3">Portfolio News</h4>
          <div>
            {newsList}
          </div>
        </div>
      )
  }
}


