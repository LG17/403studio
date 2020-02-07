import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: null,
    isUserLogin: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLogin = true
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  }
})

export default store
