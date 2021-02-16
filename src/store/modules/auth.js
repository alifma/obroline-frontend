import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      // name: localStorage.getItem('name') || '',
      // id: localStorage.getItem('id') || null,
      loginData: {}
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setLoginData (state, payload) {
      state.access = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data)
          .then((response) => {
            localStorage.setItem('token', response.data.pagination.token)
            context.commit('setToken', response.data.pagination.token)
            context.commit('setLoginData', response.data.data)
            resolve(response.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        // localStorage.removeItem('token')
        // localStorage.removeItem('access')
        // localStorage.removeItem('name')
        // localStorage.removeItem('id')
        // context.commit('setToken', null)
        // context.commit('setAccess', null)
        // context.commit('setName', '')
        // context.commit('setId', null)
        resolve(true)
      })
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
  }
}
export default moduleAuth
