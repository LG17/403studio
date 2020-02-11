import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

const request = axios.create({
  baseURL: '/api',
  headers: {
    showLoading: true //  在此打开或关闭进度条
    // eslint-disable-next-line no-template-curly-in-string
    // Authorization: `Bearer ${store.state.token}`
  }
})
NProgress.configure({ showSpinner: false })

request.interceptors.request.use(config => {
  if (config.headers.showLoading) {
    NProgress.start()
    delete config.headers.showLoading
  }
  config.headers.Authorization = `Bearer ${store.state.token}`
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
