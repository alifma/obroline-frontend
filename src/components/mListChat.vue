<template>
  <div style="height:100vh">
    <div v-if="target.name === ''" class="text-center h-100">
      <table style="height: 100%;width:100%">
        <tbody>
          <tr>
            <td class="align-middle text-secondary">Please select a chat to start messaging</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="h-100">
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
      <ul class="card-body hideScroll list-group px-4" style="height:75vh;overflow-y:scroll;list-style:none;" id="container">
        <li v-for="(item, index) in chatList" :key="index" class="w-100">
          <div v-if="item.senderName != loginUserData.name" class="w-50">
              <p class="btn ml-1 btn-main mt-1 mb-0 text-justify " style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px; max-width:100%; overflow-wrap: break-word">{{item.message}}</p>
            <small class="text-left py-0 btn text-secondary w-100" style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString()}}</small>
          </div>
          <div v-else class="w-100 text-right">
            <p class="btn mb-0 my-0 py-0 text-justify"
              style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-top-left-radius:15px;max-width:50%; overflow-wrap: break-word">
              {{item.message}}</p>
            <small class="text-right py-0 btn text-secondary w-100"
              style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString()}}</small>
          </div>
        </li>
      </ul>
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
    getFriendsData () {
      this.friendsDataAction(this.target.id)
      if (this.$route.name !== 'ProfileFriends') {
        this.$router.push('/friends')
      }
    },
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    },
    scrollToEnd () {
      // scroll to the start of the last message
      // this.$el.scrollTop = this.$el.lastElementChild.offsetTop
      const containerMessage = this.$el.querySelector('#container')
      containerMessage.scrollTop = containerMessage.scrollHeight
    }
  },
  updated () {
    this.$nextTick(() => this.scrollToEnd())
  },
  mounted () {
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
