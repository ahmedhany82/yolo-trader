import axios from 'axios';

const placeOrder = (limit, number, orderType) => {
  if(orderType === "buy")
  {
    console.log("Buy order was called")
  } else {
    console.log("Sell order was called")
  }
  // return axios.post('/api/auth/signup', { username, password }).then(response => {
  //     return response.data
  //   })
  //   .catch(err => {
  //     return err.response.data
  //   })
}


export { placeOrder };