import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from '../store/modules/auth'
Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
      apiURL: process.env.VUE_APP_API_URL || 'http://localhost:4000/api'
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth
  }
})
export default store
