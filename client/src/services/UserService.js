import request from './index'

export default {
  async getUserById () {
    const response = await request.get('/users/1')
    return response.data
  },
  register (data) {
    return request.post('/users/register', data)
  },
  login (data) {
    return request.post('/users/login', data)
  }
}
