import axios from 'axios';

const placeOrder = (price, count, orderType, userId, ticker) => {

  /* Buy order */
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
              let updatedCount = res.data[0].count + count;
              return axios.post(`/api/${userId}/position/update/${ticker}`, {count: updatedCount, averagePrice: updatedPrice}).then(res=> {
                return(res.data);
              })
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    });
  } else {
    /* Selling order */

    //Check if user has a position in the input stock
    return axios.get(`/api/${userId}/position/${ticker}`).then(pos => {
      if(pos.data.length === 0) {
          return JSON.parse('{"message": "No open positions in this stock."}');
        } else if(pos.data[0].count < count) {
            return JSON.parse('{"message": "Your current position is not enough for this order."}')
          } else {
            return axios.get(`/api/${userId}/balance`).then(res => {
              const balancefromDB = res.data;
              if(pos.data[0].count === count) {
                //Update the balance and close current position
                const balance = balancefromDB + (price * count);
                return axios.post(`/api/${userId}/balance`, {balance}).then(res => {
                    return axios.post(`/api/${userId}/position/close/${ticker}`).then(res => {
                        return(res.data);
                        }).catch(err => {
                            console.log(err);
                        })
                }).catch(err => {
                  console.log(err);
                })
              } else {
                //Update the balance and existing position. Only stock count is updated.
                let updatedCount = pos.data[0].count - count;
                console.log(balancefromDB)
                const balance = balancefromDB + (price * count);
                
                return axios.post(`/api/${userId}/balance`, {balance}).then(res => {
                    return axios.post(`/api/${userId}/position/update/${ticker}`, {count: updatedCount, averagePrice: pos.data[0].averagePrice}).then(res=> {
                      return(res.data);
                    }).catch(err => {
                      console.log(err);
                    })
                }).catch(err => {
                  console.log(err);
                })
              }
            }).catch(err => {
              console.log(err);
            })
          }
    }).catch(err => {
      console.log(err);
    });
  }
}

const getPortfolio = (userId) => {
  return axios.get(`/api/${userId}/portfolio`).then(res => {
    return(res.data);
  }).catch(err => {
    console.log(err);
  })
}

const getbalance = (userId) => {
  return axios.get(`/api/${userId}/balance`).then(res => {
    return(res.data);
  }).catch(err => {
    console.lof(err);
  })
}



export { placeOrder, getPortfolio, getbalance};