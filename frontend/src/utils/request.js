import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 设置请求头
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  // 设置请求数据
  if (config.data instanceof Object) {
    let dt = ''
    for (const i in config.data) {
      if (config.data[i] instanceof Object) {
        for (const j in config.data[i]) {
          if (dt !== '') {
            dt += '&'
          }
          dt += i + '[' + j + ']' + '=' + config.data[i][j]
        }
      } else {
        if (dt !== '') {
          dt += '&'
        }
        dt += i + '=' + config.data[i]
      }
    }
    config.data = dt
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
