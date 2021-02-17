// import axios from 'axios'
import io from 'socket.io-client'
const moduleChat = {
  namespaced: true,
  state: () => {
    return {
      socket: io('http://localhost:4000'),
      userList: [],
      chat: [],
      target: {
        id: 0,
        name: ''
      }
    }
  },
  mutations: {
    setUserList (state, payload) {
      state.userList = payload
    },
    setChat (state, payload) {
      state.chat = payload
    },
    setTarget (state, payload) {
      state.target = {
        id: payload.targetId,
        name: payload.targetName
      }
    }
  },
  actions: {
    joinRoom (context, id) {
      context.state.socket.emit('join-room', id)
    },
    // Ambil Daftar Teman
    getListUsers (context, data) {
      context.state.socket.emit('get-list-users', data.id, data.roomId)
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
      context.commit('setTarget', { targetId: data.targetId, targetName: data.targetName })
    },
    // Kirim Pesan
    sendChat (context, data) {
      context.state.socket.emit('send-message', data)
    },
    // EmptyData
    emptyChat (context) {
      context.commit('setTarget', { targetId: 0, targetName: '' })
      context.commit('setChat', [])
      context.commit('setUserList', [])
    }
  },
  getters: {
    userList: state => state.userList,
    chatList: state => state.chat,
    getTarget: state => state.target
  }
}
export default moduleChat
