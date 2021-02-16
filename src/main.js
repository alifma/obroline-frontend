import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap & Bootstrap-Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../src/assets/css/style.css'

Vue.config.productionTip = false
// Use Bootstrap & Bootstrap-Vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
