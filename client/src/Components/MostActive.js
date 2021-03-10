import React, { Component } from 'react'
import axios from 'axios'

export default class MostActive extends Component {

  state={
    mostactive:[]
  }

  componentDidMount() {
    axios.get(`https://${process.env.REACT_APP_URL_KEY}.iexapis.com/stable/stock/market/list/mostactive?listLimit=3&token=${process.env.REACT_APP_IEXTEST_KEY}`).then(response => {
      this.setState({
        mostactive: response.data
      })
    }).catch(err => {
      console.log(err);
    })
  }


  render() {
    if(this.state.mostactive.length === 0) {return <h1>Loading...</h1>}
    const activeList = this.state.mostactive.map((element,index) => {
      return (
        <div key={index} className="d-flex flex-row justify-content-between alig-self-start ml-3 mr-3 pl-3 pr-3 pb-0 pt-0">
            <div className="d-flex flex-column justify-content-start align-self-center">
              <p className="mb-0"><strong>{element.symbol}</strong></p>
              <p style={{color: "grey"}}>{element.companyName}</p>
            </div>
            <div className="d-flex flex-column justify-content-start align-self-center">
              <p className="mb-0">${element.latestPrice}</p>
              <p  style={(element.changePercent < 0)? {color: 'red'}: {color: 'green'}} >{element.changePercent > 0? '+': '-'}{Math.abs(element.changePercent.toFixed(2))}%</p>              
            </div>
        </div>
        )
    })
    return (
      <div style={{width: "45vw", height: "35vh"}} className="ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
        <h4 className="ml-3 mb-4">Most Active</h4>
        <div className="mb-0 pt-0 pb-0">
            {activeList}
        </div>        
      </div>
    )
  }
}
