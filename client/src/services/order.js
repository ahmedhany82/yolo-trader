import axios from 'axios';

const placeOrder = (limit, number, orderType, userId) => {
  if(orderType === "buy")
  {
    console.log("Buy order was called", userId)
  } else {
    console.log("Sell order was called", userId)
  }
  axios.get(`/api/${userId}/balance`).then(response => {
    console.log(`Balance for user ${userId} is`, response.data);
  }).catch(err => {
    console.log(err)
  })
  // return axios.post('/api/auth/signup', { username, password }).then(response => {
  //     return response.data
  //   })
  //   .catch(err => {
  //     return err.response.data
  //   })
}


export { placeOrder };