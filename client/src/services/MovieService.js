import request from './index'

export default {
  create (data) {
    return request.post('/movies', data)
  },
  updateMovie (id, data) {
    return request.put(`/movies/${id}`, data)
  },
  getMovieById (id) {
    return request.get(`/movies/${id}`)
  },
  getAll (query = '') {
    return request.get(`/movies?${query}`)
  }
}
