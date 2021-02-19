import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      roomId: localStorage.getItem('roomId'),
      loginData: {},
      friendsData: {}
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setLoginData (state, payload) {
      state.loginData = payload
    },
    setFriendsData (state, payload) {
      state.friendsData = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.apiURL}/login`, data)
          .then((response) => {
            if (response.data.code === 200) {
              localStorage.setItem('token', response.data.pagination.token)
              localStorage.setItem('id', response.data.pagination.user.id)
              localStorage.setItem('roomId', response.data.pagination.user.roomId)
              localStorage.setItem('userData', response.data.pagination.user)
              context.commit('setToken', response.data.pagination.token)
              context.commit('setLoginData', response.data.pagination.user)
              resolve(response.data)
            } else {
              resolve(response.data)
            }
          }).catch((err) => {
            reject(err)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('roomId')
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
    },
    updateUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.apiURL}/user/${data.id}`, data.fd)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDetailUser (context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user/${id}`)
          .then((response) => {
            context.commit('setLoginData', response.data.data[0])
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getFriendsData (context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.rootState.apiURL}/user/${id}`)
          .then((response) => {
            let responseData = response.data.data[0]
            const isFriends = context.rootState.chat.userList.filter((i) => {
              return i.id === response.data.data[0].id
            })
            if (isFriends.length > 0) {
              responseData = {
                ...responseData,
                isfriends: true
              }
            } else {
              responseData = {
                ...responseData,
                isfriends: false
              }
            }
            context.commit('setFriendsData', responseData)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    dataLogin: state => state.loginData,
    dataFriends: state => state.friendsData,
    loginId: state => state.id,
    loginRoomId: state => state.roomId
  }
}
export default moduleAuth
