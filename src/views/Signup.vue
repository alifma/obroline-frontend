<template>
  <div class="container" style="height:100vh">
    <div class="row h-100">
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
      <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
        <div class="card p-4 shadow" style="border-radius:25px">
          <div class="card-body">
            <router-link to="/login" class="float-left font-weight-bold d-inline-block mt-3 text-main mb-0"> <i class="fas fa-angle-left"></i> </router-link>
            <h4 class="text-main text-center my-3">Register</h4>
            <p class="mt-4">Let's create your account!</p>
            <form @submit.prevent="register()" action="" class="mt-4">
              <div class="form-group mb-4">
                <label class="text-secondary">Name</label>
                <input required type="text" v-model="holderRegister.name" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black" value="Admin Obroline">
              </div>
              <div class="form-group mb-4">
                <label class="text-secondary">Email</label>
                <input required type="email" v-model="holderRegister.email" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black" value="obroline@gmail.com">
              </div>
              <div class="form-group mt-4">
                <label class="text-secondary">Password</label>
                <input required type="password" value="password"
                  v-model="holderRegister.password" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black">
              </div>
              <button class="btn btn-main w-100 font-weight-bold my-3"
                style="border-radius:50px;height:60px">Register</button>
            </form>
              <div class="row text-center text-secondary">
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
                <div class="col-4 my-auto">
                  <p class="mb-0 ">Register with</p>
                </div>
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
              </div>
              <button class="btn btn-sub w-100 font-weight-bold my-3"  @click="swalAlert('Coming Soon', 'You will be able to Sign-Up with your google account', 'info')" style="border-radius:50px;height:60px">
                <b-icon-google></b-icon-google> Google
              </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  name: 'Signup',
  data () {
    return {
      holderRegister: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'auth/register'
    }),
    register () {
      this.swalLoading('Registering Data')
      this.actionRegister(this.holderRegister)
        .then((res) => {
          if (res.code === 200) {
            this.swalLoadingClose()
            this.swalAlert('Register Success', 'Please Login', 'success')
            this.$router.push('/login')
          } else {
            this.swalLoadingClose()
            this.swalAlert('Register Failed', res.pagination.errorMsg, 'error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
