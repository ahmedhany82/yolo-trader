import React, { Component } from 'react'

export default class OrderDetails extends Component {
 

  state = {
    limit: undefined,
    number: undefined,
  }


  handleFormInput = event => {
    const name = event.target.name;
    let value = Number(event.target.value);
    this.setState((state, props) => ({
      [name]: value,
    }))
  };

  handleSubmit = event => {

  }

  closeMenue = event => {
    // this.setState({
    //   opene: false
    // })
    console.log("close")
    this.props.callback();
  }

  render() {
    // if(this.props.flag) {
      if(this.props.flag) {
      return (
        <div style={{width: '23vw'}} className="mt-3 border p-3 border-primary">
          <div className="d-flex flex-row justify-content-between align-items-start">
            
            <h3 className="mt-3 mb-4">Place an order</h3>
            <button type="button" onClick={this.closeMenue} class="btn-close mt-3" aria-label="Close">X</button>
          </div>         
          <form onSubmit={this.handleSubmit} style={{width:'100%', marginBottom: '50px'}}>
                   
                    <div className="form-group">
                        <label htmlFor="limit">Limit</label>
                        <input className="form-control" style={{width:'90%', height: '25px', marginBottom: '20px'}}
                        type="number"
                        name="limit"
                        id="limit"
                        placeholder="Limit ($)"
                        value={this.state.limit}
                        min="0"
                        onChange={this.handleFormInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Number</label>
                        <input className="form-control" style={{width:'90%', height: '25px', marginBottom: '20px'}}
                        type="number"
                        name="number"
                        id="number"
                        placeholder="Number"
                        value={this.state.number}
                        min="0"
                        onChange={this.handleFormInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input className="form-control" style={{width:'90%', height: '25px', marginBottom: '20px'}}
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Amount ($)"
                        value={this.state.limit * this.state.number}
                        onChange={this.handleFormInput}
                        disabled/>
                    </div>                    
                    <button type="submit" className="btn btn-primary mt-3">Place order</button>                                                                            
                </form>
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
