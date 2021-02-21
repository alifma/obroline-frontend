<template>
  <div style="height:100vh">
    <!-- If no room are selected -->
    <div v-if="target.name === ''" class="text-center h-100">
      <table style="height: 100%;width:100%">
        <tbody>
          <tr>
            <td class="align-middle text-secondary">Please select a chat to start messaging</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- If Room are selected -->
    <div v-else class="h-100">
      <!-- Headers -->
      <div class="my-auto" style="height:10vh">
        <table class="w-100 h-100">
          <tbody @click="getFriendsData()">
            <tr>
              <td rowspan="2" style="width:10%" class="text-center">
                <img :src="`${webURL}/img/${target.image}`" @click="getFriendsData()"
                  style="heigth:8vh;width:8vh;border-radius:18px" class="text-center img-fluid" alt="...">
              </td>
              <td style="width:90%" class="pb-0 h-50">
                <p class="mb-0 text-dark card-title my-0 font-weight-bold">{{target.name}}</p>
              </td>
            </tr>
            <tr>
              <td style="width:90%" class="pt-0 h-50">
                <p class="card-text mb-0 text-main">{{target.socketId === null ? 'Offline' : 'Online'}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End Headers -->
      <!-- List Chat Container -->
      <ul class="card-body hideScroll list-group px-4" style="height:75vh;overflow-y:scroll;list-style:none;" id="container">
        <li v-for="(item, index) in chatList" :key="index" class="w-100">
          <div v-if="item.senderName != loginUserData.name" class="w-50">
              <img style="width:50px;border-radius:15px" :src="`${webURL}/img/${target.image}`" alt=""><p class="btn ml-1 btn-main mt-1 mb-0 text-justify " style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px; max-width:100%; overflow-wrap: break-word">{{item.message}}</p>
            <small class="text-left py-0 btn text-secondary w-100" style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})}}</small>
          </div>
          <div v-else class="w-100 text-right">
            <p class="btn mb-0 my-0 py-0 text-justify"
              style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-top-left-radius:15px;max-width:50%; overflow-wrap: break-word">
              {{item.message}}</p>
              <img style="width:50px;border-radius:15px" :src="`${webURL}/img/${loginUserData.image}`" alt="">
            <small class="text-right py-0 btn text-secondary w-100"
              style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})}}</small>
          </div>
        </li>
      </ul>
      <!-- End List Chat Container -->
      <!-- Footer Input Text -->
      <div class="card-footer text-center" style="height:15vh">
        <form @submit.prevent="sendChat()" class="w-100 form-inline">
          <div class="row w-100" >
            <div class="col-12 col-md-11 col-lg-9 my-auto">
            <input v-model="message" class="form-control w-100" type="text" ref="inputChat" placeholder="Type your message ...">
            </div>
            <div class="col-lg-3 col-md-1 text-main">
                <i @click="sendChat()" class="far fa-2x mx-2 fa-paper-plane"></i>
                <i @click="comingSoon('Add Files')" class="fas fa-2x mx-2 fa-plus d-sm-none d-lg-inline-block d-md-none "></i>
                <i @click="comingSoon('Add Sticker')" class="fas fa-2x mx-2 fa-surprise d-sm-none d-lg-inline-block d-md-none "></i>
                <i @click="comingSoon('Add Camera Photos')" class="fas fa-2x mx-2 fa-camera d-sm-none d-lg-inline-block d-md-none "></i>
            </div>
          </div>
        </form>
      </div>
      <!-- End Footer Input Text -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  name: 'ListChat',
  mixins: [obrolinemixin],
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
      target: 'chat/getTarget',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionSendChat: 'chat/sendChat',
      friendsDataAction: 'auth/getFriendsData'
    }),
    // // Kirim Pesan
    sendChat () {
      const data = {
        senderId: this.loginUserData.id,
        targetId: this.target.id,
        msg: this.message
      }
      this.actionSendChat(data)
      this.scrollToEnd()
      this.message = ''
    },
    // Ambil data teman ke page details
    getFriendsData () {
      this.friendsDataAction(this.target.id)
      if (this.$route.name !== 'ProfileFriends') {
        this.$router.push('/friends')
      }
    },
    // Alert Comming Soon Data
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    },
    // Auto Scroll to Bottom New Chat
    scrollToEnd () {
      if (this.$el.querySelector('#container')) {
        const containerMessage = this.$el.querySelector('#container')
        containerMessage.scrollTop = containerMessage.scrollHeight
      }
    }
  },
  // Panggil fungsi scroll to end setiap ada pembaruan halaman ini
  updated () {
    this.$nextTick(() => this.scrollToEnd())
  }
}
</script>
<style scoped>
.verticalCenter {
  min-height: 10em;
  display: table-cell;
  vertical-align: middle
}
</style>
