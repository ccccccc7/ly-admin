import axios from 'axios'
import Qs from 'qs'
import {Message} from 'element-ui'

//请求头
axios.defaults.headers.post['Content-Type'] = 'applapplication/x-www-form-urlencoded;charset=UTF-8ic'

const Axios = axios.create({
  // baseURL: 'http://localhost:8001', //接口基础地址
  timeout: 10000,                   //超时时间
  responseType: 'json',
});

//请求拦截器
Axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data)
    }
    return config;
  },
  error => {
    Message({
      showClose: true,
      message: error,
      type: 'error.data.message'
    });
    return Promise.reject(error.data.message)
  }
);


//响应拦截器
Axios.interceptors.response.use(
  (res) => {
    if (res.data && !res.data.success) {
      Message({
        showClose: true,
        message: res.data.message,
        type: "error"
      });
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function fetch(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function del(url) {
  return new Promise((resolve, reject) => {
    axios.delete(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function fetchList(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

