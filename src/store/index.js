import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from '../store/modules/auth'
import moduleChat from '../store/modules/chat'
Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
      webURL: process.env.VUE_APP_WEB_URL || 'http://localhost:4000',
      apiURL: process.env.VUE_APP_API_URL || 'http://localhost:4000/api'
    }
  },
  getters: {
    webURL: state => state.webURL
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth,
    chat: moduleChat
  }
})
export default store
