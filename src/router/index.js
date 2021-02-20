import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Reset from '../views/Reset.vue'
import store from '../store/index'
import Profile from '../views/Profile.vue'
import ProfileFriends from '../views/ProfileFriends.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Signup',
    component: Signup,
    meta: { auth: false }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    meta: { auth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { auth: true }
  },
  {
    path: '/friends',
    name: 'ProfileFriends',
    component: ProfileFriends,
    meta: { auth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/token']) {
      next()
    } else {
      Vue.swal({ icon: 'error', title: 'You are not logged in' })
      next({
        path: '/login'
      })
    }
  } else {
    next()
    // if (store.getters['auth/token']) {
    //   Vue.swal({ icon: 'error', title: 'You already logged in' })
    //   next({
    //     path: '/'
    //   })
    // } else {
    //   next()
    // }
  }
})

export default router
