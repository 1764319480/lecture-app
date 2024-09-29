// import axios from 'axios';

// const instance = axios.create({
//     // baseURL: 'http://localhost:3000/',
//     timeout: 2000
    
// })
const getToken = () => {
  let token = '';
  try {
    const value = uni.getStorageSync('token');
    if (value) {
      token = value;
    }
  } catch (e) {
    try {
      const value = uni.getStorageSync('supertoken');
      if (value) {
        token = value;
      }
    } catch (e) {
      token = '';
    }
  }
  return token;
}
const myaxios = {
  baseURL: 'http://localhost:3000/',
  async get(url, ...data) {
    const token = getToken();
    try {
      var res = await uni.request({
        url: this.baseURL + url.slice(5),
        data,
        header:token == ''?{}:{'Authorization': token}
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  async post(url, data) {
    const token = getToken();
    try {
      var res = await uni.request({
        method: 'POST',
        url: this.baseURL + url.slice(5),
        data,
        header:token == ''?{}:{'Authorization': token}
      });
      return res;
    } catch (err) {
      return err;
    }
  },
}

export default myaxios