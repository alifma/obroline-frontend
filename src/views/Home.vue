<template>
  <div class="home container">
    <div class="row">
      <div class="col-12 col-md-3 col-lg-3">
        <div class="card mt-5">
          <div class="card-header">
            <h3>Friendlist</h3>
          </div>
          <div class="card-body" >
            <ul class="list-group">
              <li v-for="(item, index) in users" :key="index" @click="getListChat (item.id, item.name) " class="list-group-item">{{item.name}}</li>
            </ul>
          </div>
          <div class="card-footer">
            <p class="mb-0 text-center"><span class="text-main">{{users.length}}</span> Friend(s) are online</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 col-lg-9">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h1>Room Chat #{{loginUserData.roomId}}</h1>
          </div>
          <div class="card-body" style="max-height:50vh;overflow-y:scroll">
            <h1 class="text-center">Konten Chat Nanti ada di Sini</h1>
            <div v-for="(item, index) in chat" :key="index" >
              <p v-if="item.senderName != loginUserData.name"><b>{{item.senderName}} : </b> {{item.message}}</p>
              <p v-else><b>You : </b> {{item.message}}</p>
            </div>
          </div>
          <div class="card-footer text-center">
            <form @submit.prevent="sendMsg()" class="w-100 form-inline">
              <input v-model="message" class="form-control w-75" type="text">
              <button type="submit" class="btn btn-main w-25">Send</button>
            </form>
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
      chat: [],
      socket: io('http://localhost:4000'),
      targetId: 0,
      targetName: '',
      senderId: 0,
      senderName: '',
      message: ''
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
    // Ambil Daftar Teman
    getListUsers () {
      this.socket.emit('get-list-users', this.loginUserData.id, this.loginUserData.roomId)
    },
    // Taruh Responsnya ke Data
    resGetListUsers () {
      this.socket.on('res-get-list-users', (users) => {
        this.users = users
      })
    },
    // Data Dummy dulu, nanti diambil langsung via vuex
    setDummyData () {
      this.senderId = this.loginUserData.id
      this.senderName = this.loginUserData.name
    },
    // AMbil Daftar Chat yang sudah ada
    getListChat (targetId, targetName) {
      this.targetName = targetName
      this.targetId = targetId
      this.socket.emit('get-list-chat', { senderId: this.senderId, targetId: targetId, roomId: this.loginUserData.roomId })
      this.resGetListChat()
    },
    // Taruhh Response chat yang sudah ada
    resGetListChat () {
      this.socket.on('res-get-list-chat', (chat) => {
        this.chat = chat
      })
    },
    // Kirim Pesan
    sendMsg () {
      const data = {
        senderId: this.senderId,
        targetId: this.targetId,
        msg: this.message
      }
      this.socket.emit('send-message', data)
      this.message = ''
    }
  },
  mounted () {
    this.setDummyData()
    this.joinRoom()
    this.getListUsers()
    this.resGetListUsers()
  }
}
</script>
