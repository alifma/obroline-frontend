// import axios from 'axios'
import io from 'socket.io-client'
const moduleChat = {
  namespaced: true,
  state: () => {
    return {
      socket: io('http://localhost:4000'),
      userList: [],
      searchList: [],
      chat: [],
      target: {
        id: 0,
        name: '',
        image: 'default.png',
        socketId: ''
      }
    }
  },
  mutations: {
    setUserList (state, payload) {
      state.userList = payload
    },
    setSearchList (state, payload) {
      state.searchList = payload
    },
    setChat (state, payload) {
      state.chat = payload
    },
    setTarget (state, payload) {
      state.target = {
        id: payload.targetId,
        name: payload.targetName,
        image: payload.image,
        socketId: payload.socketId
      }
    }
  },
  actions: {
    connected (context, data) {
      context.state.socket.emit('connected', data)
    },
    disconnected (context) {
      context.state.socket.emit('logout')
    },
    joinRoom (context, id) {
      context.state.socket.emit('join-room', id)
    },
    searchName (context, data) {
      context.state.socket.emit('search-name', data)
      context.state.socket.on('res-search-name', (response) => {
        context.commit('setSearchList', response)
      })
    },
    // Ambil Daftar Teman
    getListUsers (context, data) {
      context.state.socket.emit('get-list-users', data.id, data.roomId)
      context.state.socket.on('res-get-list-users', (response) => {
        context.commit('setUserList', response)
      })
    },
    // Refresh List Users
    getListContactRT (context) {
      context.state.socket.on('res-get-list-users', (response) => {
        context.commit('setUserList', response)
      })
    },
    // Ambil Daftar Chat
    getListChat (context, data) {
      context.state.socket.emit('get-list-chat', { senderId: data.senderId, targetId: data.targetId, roomId: data.roomId })
      context.state.socket.on('res-get-list-chat', (response) => {
        context.commit('setChat', response)
      })
      context.commit('setTarget', { targetId: data.targetId, targetName: data.targetName, image: data.image, socketId: data.socketId })
    },
    // Kirim Pesan
    sendChat (context, data) {
      context.state.socket.emit('send-message', data)
    },
    // EmptyData
    emptyChat (context) {
      context.commit('setTarget', { targetId: 0, targetName: '', image: 'default.png', socketId: '' })
      context.commit('setChat', [])
      context.commit('setUserList', [])
    },
    addFriends (context, data) {
      context.state.socket.emit('add-friends', data)
    }
  },
  getters: {
    userList: state => state.userList,
    searchList: state => state.searchList,
    chatList: state => state.chat,
    getTarget: state => state.target
  }
}
export default moduleChat
