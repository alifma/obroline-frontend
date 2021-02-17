import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      id: localStorage.getItem('id') || null,
      loginData: {}
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setLoginData (state, payload) {
      state.loginData = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data)
          .then((response) => {
            localStorage.setItem('token', response.data.pagination.token)
            localStorage.setItem('id', response.data.pagination.user.id)
            context.commit('setToken', response.data.pagination.token)
            context.commit('setLoginData', response.data.pagination.user)
            resolve(response.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        context.commit('setLoginData', {})
        resolve(true)
      })
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/register`, data)
          .then((response) => {
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    dataLogin: state => state.loginData
  }
}
export default moduleAuth
