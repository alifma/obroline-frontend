<template>
  <div class="container" style="height:100vh">
    <div class="row h-100">
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
      <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
        <div class="card p-4 shadow" style="border-radius:25px">
          <div class="card-body">
            <h4 class="text-main text-center my-3">Login</h4>
            <p class="mt-4">Hi, Welcome Back!</p>
            <form @submit.prevent="login()" action="" class="mt-4">
              <div class="form-group mb-4">
                <label class="text-secondary">Email</label>
                <input v-model="holderLogin.email" type="email"  autocomplete="email" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black">
              </div>
              <div class="form-group mt-4">
                <label class="text-secondary">Password</label>
                <input v-model="holderLogin.password"  autocomplete="current-password" type="password" value="password"
                  class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black">
              </div>
              <div class="form-group mt-4 text-right">
                <router-link to="/reset" class="text-main">Forgot passsword?</router-link>
              </div>
              <button class="btn btn-main w-100 font-weight-bold my-3"
                style="border-radius:50px;height:60px">Login</button>
              </form>
              <div class="row text-center text-secondary">
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
                <div class="col-4 my-auto">
                  <p class="mb-0 ">Login With</p>
                </div>
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
              </div>
              <button class="btn btn-sub w-100 font-weight-bold my-3" @click="swalAlert('Coming Soon', 'You will be able to Sign-in with your google account', 'info')" style="border-radius:50px;height:60px">
                <b-icon-google></b-icon-google> Google
              </button>
              <p class="text-center">Don’t have an account? <router-link to="/register" class="text-main ">Sign Up</router-link></p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  data () {
    return {
      holderLogin: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      // userLogin: 'auth/dataLogin'
    })
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login',
      actionJoinRoom: 'chat/joinRoom',
      getListUser: 'chat/getListUsers',
      connected: 'chat/connected'
    }),
    login () {
      this.swalLoading('Loading Data')
      this.actionLogin(this.holderLogin)
        .then((res) => {
          if (res.code === 200) {
            this.holderLogin = {
              email: '',
              password: ''
            }
            this.getChatList(res.pagination.user)
            this.swalLoadingClose()
            this.connected(res.pagination.user)
            this.swalAlert('Login Success', '', 'success')
            this.$router.push('/')
          } else {
            this.swalLoadingClose()
            this.swalAlert('Login Failed', res.pagination.errorMsg, 'error')
          }
        })
        .catch((err) => {
          this.swalLoadingClose()
          console.log(err.message)
        })
    },
    getChatList (data) {
      this.actionJoinRoom(data.roomId)
      this.getListUser(data)
    }
  }
}
</script>

<style>

</style>
