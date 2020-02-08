import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create()
NProgress.configure({ showSpinner: false })

request.interceptors.request.use(config => {
  NProgress.start()
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
