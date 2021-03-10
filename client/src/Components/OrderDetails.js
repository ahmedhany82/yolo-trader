import React, { Component } from 'react'
import { placeOrder } from '../services/order';

export default class OrderDetails extends Component {
 

  state = {
    limit: undefined,
    number: undefined,
    message: ''
  }


  handleFormInput = event => {
    const name = event.target.name;
    let value = Number(event.target.value);
    this.setState((state, props) => ({
      [name]: value,
    }))
  };

  handleOrder = event => {
    event.preventDefault();
    const { limit, number } = this.state;
    console.log("An order is placed!")
    console.log(limit, number, this.props.orderType);
    placeOrder(limit, number, this.props.orderType, this.props.user._id, this.props.ticker).then(response => {
      const message = response.message
      this.setState({
        message: message,
        limit: '',
        number: ''
      })
    }).catch(err => {
      console.log(err);
    });
    //   .then(user => {
    //     if (user.message) {
    //       this.setState({
    //         message: user.message,
    //         username: '',
    //         password: ''
    //       })
    //     } else {
    //       console.log(user)
    //       this.props.setUser(user);
    //       this.props.history.push('/');
    //     }
    //   })    
  }

  closeMenue = event => {
    this.props.callback();
  }

  render() {
    // if(this.props.flag) {
      
      if(this.props.flag) {
      return (
        <div style={{width: '23vw'}} className="mt-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded">
          <div className="d-flex flex-row justify-content-between align-items-start">
            
            <h3 className="mt-3 mb-4">Place an order</h3>
            <button type="button" onClick={this.closeMenue} className="btn-close mt-3" aria-label="Close">X</button>
          </div>         
          <form onSubmit={this.handleOrder} style={{width:'100%', marginBottom: '50px'}}>
                    <div className="form-group">
                        <label htmlFor="limit">Limit</label>
                        <input className="form-control" style={{width:'90%', height: '25px', marginBottom: '20px'}}
                        type="number"
                        step="0.01"
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
                        value={this.state.limit * this.state.number || 0} 
                        disabled/>
                    </div>                    
                    <button type="submit" className="btn btn-primary mt-3">Place order</button>
                    {this.state.message && (<h3>{this.state.message}</h3>)}                                                                                      
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
