// import axios from 'axios';

// const instance = axios.create({
//     // baseURL: 'http://localhost:3000/',
//     timeout: 2000
    
// })
const myaxios = {
  baseURL: 'http://localhost:3000/',
  async get(url, ...data) {
    try {
      var res = await uni.request({
        url: this.baseURL + url.slice(5),
        data
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  async post(url, data) {
    try {
      var res = await uni.request({
        url: this.baseURL + url.slice(5),
        data
      });
      return res;
    } catch (err) {
      return err;
    }
  },
}

export default myaxios