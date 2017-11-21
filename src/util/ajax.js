import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

//接口基础地址
axios.defaults.baseURL = 'http://localhost:8001'
//超时时间
axios.defaults.timeout = 5000;
//请求头
axios.defaults.headers.post['Content-Type'] = 'applapplication/x-www-form-urlencoded;charset=UTF-8ic'

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res.data.success) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

var ajax = {
  post: function (url, data, suc, err) {
    axios.post(url, qs.stringify(data))
      .then((response) => {
        if (response.data.success) {
          suc(response)
        } else {
          err(response);
        }
      })
  },
  get: function (url, suc, err) {
    axios.get(url).then((response) => {
      if (response.data.success) {
        suc(response.data)
      } else {
        err(response);
      }
    })
  }
}

export default ajax;

