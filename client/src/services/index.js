import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  headers: {
    showLoading: true //  在此打开或关闭进度条
  }
})
NProgress.configure({ showSpinner: false })

request.interceptors.request.use(config => {
  if (config.headers.showLoading) {
    NProgress.start()
    delete config.headers.showLoading
  }
  return config
})
request.interceptors.response.use(response => {
  NProgress.done()
  return response
}, function (error) {
  NProgress.done()
  return Promise.reject(error)
})

export default request
