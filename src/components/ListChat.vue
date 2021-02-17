<template>
  <div class="col-12 col-md-8 col-lg-8 mx-0 px-0" style="height:100vh">
    <div class="card h-100">
      <div class="card-header text-center">
        <h1>Room Chat {{target}}</h1>
        <!-- <h1>Room Chat #{{loginUserData.roomId}}</h1> -->
      </div>
      <div class="card-body" style="max-height:50vh;overflow-y:scroll">
        <h1 class="text-center">Konten Chat Nanti ada di Sini</h1>
        <div v-for="(item, index) in chatList" :key="index">
          <p v-if="item.senderName != loginUserData.name"><b>{{item.senderName}} : </b> {{item.message}}</p>
          <p v-else><b>You : </b> {{item.message}}</p>
        </div>
      </div>
      <div class="card-footer text-center">
        <form @submit.prevent="sendChat()" class="w-100 form-inline">
          <input v-model="message" class="form-control w-75" type="text">
          <button type="submit" class="btn btn-main w-25">Send</button>
        </form>
        <p class="mb-0">Logged In as {{loginUserData.name}}</p>
        <button @click="logout()" class="btn btn-main">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  name: 'Home',
  data () {
    return {
      targetId: 0,
      targetName: '',
      senderId: 0,
      senderName: '',
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      loginUserData: 'auth/dataLogin',
      chatList: 'chat/chatList',
      target: 'chat/getTarget'
    })
  },
  methods: {
    ...mapActions({
      actionSendChat: 'chat/sendChat'
    }),
    // // Kirim Pesan
    sendChat () {
      const data = {
        senderId: this.loginUserData.id,
        targetId: this.target.id,
        msg: this.message
      }
      this.actionSendChat(data)
      this.message = ''
    }
  },
  mounted () {
  }
}
</script>
