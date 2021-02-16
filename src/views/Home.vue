<template>
  <div class="home container">
    <div class="card mt-5">
      <div class="card-header text-center"><h1>Halaman utama</h1></div>
      <div class="card-body">
        <h1>Content</h1>
      </div>
      <div class="card-footer text-center">
        <button @click="logout()" class="btn btn-main">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  name: 'Home',
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout'
    }),
    logout () {
      this.actionLogout()
        .then((response) => {
          this.swalAlert('Logout Success', 'You Are Logged Out', 'success')
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
