import axios from 'axios';

const signup = (username, password) => {
  console.log("signup in client was called")
  return axios.post('/api/auth/signup', { username, password }).then(response => {
      return response.data
    })
    .catch(err => {
      console.log("error on signup", err);
      return err.response.data
    })
}

const login = (username, password) => {
  console.log("login was called")
  return axios.post('/api/auth/login', { username, password }).then(response => {
    console.log("response: ", response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.response.data
    })
}

const logout = () => {
  return axios.delete('/api/auth/logout').then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data
    })
}

export { signup, login, logout };