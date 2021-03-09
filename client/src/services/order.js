import axios from 'axios';

const placeOrder = (price, count, orderType, userId, ticker) => {
  if(orderType === "buy")
  {
    return axios.get(`/api/${userId}/balance`).then(res => {
      const balancefromDB = res.data;
      if(balancefromDB < (price * count) ) {
        return JSON.parse('{"message": "Order exceeds balance"}')
      } else {
        const balance = balancefromDB - (price * count);
        return axios.post(`/api/${userId}/balance`, {balance}).then(res => {
          //Check if user has a position in the input stock
          return axios.get(`/api/${userId}/position/${ticker}`).then(res => {
            if(res.data.length === 0) {
              //Open a new position
              return axios.post(`/api/${userId}/position/open/${ticker}`, {count, averagePrice: price}).then(res => {
                return(res.data);
              })
            } else {
              //Update the existing position. Update the price to be average price taking current holdings into consideration
              console.log(res.data[0].count)
              let updatedPrice = ((res.data[0].count * res.data[0].averagePrice) + (price * count))/(res.data[0].count + count);
              return axios.post(`/api/${userId}/position/update/${ticker}`, {count, averagePrice: updatedPrice}).then(res=> {
                return(res.data);
              })
            }
          })
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    })
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