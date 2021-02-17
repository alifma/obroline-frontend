<template>
  <div class="home container">
    <div class="row">
      <div class="col-3">
        <div class="card mt-5">
          <div class="card-header">
            <h3>Friendlist</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li v-for="(item, index) in users" :key="index" class="list-group-item">{{item.name}}</li>
            </ul>
          </div>
          <div class="card-footer">
            <p class="mb-0 text-center"><span class="text-main">{{users.length}}</span> Friend(s) are online</p>
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h1>Halaman utama</h1>
          </div>
          <div class="card-body">
            <h1 class="text-center">Konten Chat Nanti ada di Sini</h1>
            <p class="text-justify">{{loginUserData}}</p>
          </div>
          <div class="card-footer text-center">
            <p class="mb-0">Logged In as {{loginUserData.name}}</p>
            <button @click="logout()" class="btn btn-main">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
import io from 'socket.io-client'
export default {
  mixins: [obrolinemixin],
  name: 'Home',
  data () {
    return {
      users: [],
      socket: io('http://localhost:4000')
    }
  },
  computed: {
    ...mapGetters({
      loginUserData: 'auth/dataLogin'
    })
  },
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
    },
    // Socket IO Methods
    // Masuk ke dalam Room
    joinRoom () {
      this.socket.emit('join-room', this.loginUserData.roomId)
    },
    getListUsers () {
      this.socket.emit('get-list-users', this.loginUserData.id, this.loginUserData.roomId)
    },
    resGetListUsers () {
      this.socket.on('res-get-list-users', (users) => {
        this.users = users
      })
    }
  },
  mounted () {
    this.joinRoom()
    this.getListUsers()
    this.resGetListUsers()
  }
}
</script>
