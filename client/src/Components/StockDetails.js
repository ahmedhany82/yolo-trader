import React, { Component } from 'react'

export default class StockDetails extends Component {

  state = {
    stock: []
  }

  componentDidMount() {
    const ticker = this.props.match.params.ticker;
    console.log(ticker) 
  }

  render() {
    return (
      <div>
        <h1>This is the StockDetails page</h1>
      </div>
    )
  }
}
