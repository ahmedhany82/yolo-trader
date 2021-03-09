import axios from 'axios';

const placeOrder = (limit, number, orderType, userId) => {
  if(orderType === "buy")
  {
    return axios.get(`/api/${userId}/balance`).then(res => {
      const balancefromDB = res.data;
      if(balancefromDB < (limit * number) ) {
        return -1; /* Order amount exceeds balance */
      } else {
        //return res.data;
        const balance = balancefromDB - (limit * number);
        return axios.post(`/api/${userId}/balance`, {balance}).then(res => {
          return res.data
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err)
    })
    
    console.log("Buy order was called", userId)
  } else {
    console.log("Sell order was called", userId)
  }

  // return axios.post('/api/auth/signup', { username, password }).then(response => {
  //     return response.data
  //   })
  //   .catch(err => {
  //     return err.response.data
  //   })
}


export { placeOrder };