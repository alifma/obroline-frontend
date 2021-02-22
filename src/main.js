import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap & Bootstrap-Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../src/assets/css/style.css'

// GoogleMaps
import * as VueGoogleMaps from 'vue2-google-maps'

// Vuex Store
import store from './store/index'
//  Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// SweetAlert2 Assign
Vue.use(VueSweetalert2)
// GoogleMaps API Key
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_API_KEY
  }
})
Vue.config.productionTip = false
// Use Bootstrap & Bootstrap-Vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
