import axios from 'axios'
import store from './vuex'
import router from './router/index.js'

// 全局 axios 默认值
// axios.defaults.baseURL = 'http://www.tb.com';
export const accountServer = 'http://localhost:5000'
// 请求 拦截器
axios.interceptors.request.use(
  config => {
    // 在请求之前做某事发送
    config.headers.Authorization = `${store.state.token}`
    return config
  }, err => {
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => { // 对响应数据做某事
    return response
  }, error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息  并跳转到login
          router.replace({
            name: '/login'
          })
      }
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data)
    }
  })

export default axios
