import React, { Component } from 'react'

export default class StockInfo extends Component {
  render() {
    if(this.props.flag) {
      return (
        <div>
          <h3>Stock Information</h3>
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
