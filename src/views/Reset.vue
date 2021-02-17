<template>
  <div class="container" style="height:100vh">
    <div class="row h-100">
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
      <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
        <div class="card p-4 shadow" style="border-radius:25px">
          <div class="card-body">
            <router-link to="/login" class="float-left text-main mb-0"> <b-icon-arrow-left></b-icon-arrow-left> </router-link>
            <h4 class="text-main text-center my-3">Forgot Password</h4>
            <p class="mt-4">You’ll get messages soon on your e-mail</p>
            <form @submit.prevent="reset()" action="" class="my-4">
              <div class="form-group mb-4">
                <label class="text-secondary">Email</label>
                <input required type="email" v-model="email" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black">
              </div>
              <button class="btn btn-main w-100 font-weight-bold my-3"
                style="border-radius:50px;height:60px">Send</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
    </div>
  </div>
</template>

<script>
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  name: 'Signup',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    reset () {
      this.swalAlert('Please Check Your Email', `Verification Email has been sent to ${this.email}`, 'success')
    }
  }
}
</script>

<style>

</style>
