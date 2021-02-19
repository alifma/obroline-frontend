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
        <div class="row no-gutters" style="height:min-content">
          <div class="col-md-1 text-center my-auto">
            <img :src="`${webURL}/img/${target.image}`" style="heigth:8vh;width:8vh" class="img-fluid" alt="...">
          </div>
          <div class="col-md-11">
            <div class="p-1">
              <p @click="getFriendsData()" class="mb-0 text-dark card-title mb-0 font-weight-bold">{{target.name}}</p>
              <p class="card-text mb-0 text-main">{{target.socketId === null ? 'Offline' : 'Online'}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body hideScroll" style="height:75vh;overflow-y:scroll">
        <div v-for="(item, index) in chatList" :key="index" class="w-100">
          <!-- <p v-if="item.senderName != loginUserData.name"><b>{{item.senderName}} : </b> {{item.message}}</p> -->
          <div v-if="item.senderName != loginUserData.name" class="text-left w-50">
            <p class="btn btn-main mt-1 mb-0 text-justify " style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px; max-width:100%; overflow-wrap: break-word">{{item.message}}</p>
            <p class="text-left btn text-secondary w-100">{{new Date(item.created_at).toLocaleTimeString()}}</p>
          </div>
          <div v-else class="text-right">
            <p class="btn mb-0 my-1 text-justify" style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-top-left-radius:15px;max-width:50%; overflow-wrap: break-word">{{item.message}}</p>
          </div>
        </div>
      </div>
      <div class="card-footer text-center" style="height:15vh">
        <form @submit.prevent="sendChat()" class="w-100 form-inline">
          <div class="row w-100" >
            <div class="col-9 col-lg-9 col-md-8">
            <input v-model="message" class="form-control w-100" type="text" placeholder="Type your message ...">
            </div>
            <div class="col-3 col-lg-3 col-md-4 my-auto">
              <div class="d-flex-column text-main justify-content-between">
                <i @click="sendChat()" class="far fa-2x mx-2 fa-paper-plane"></i>
                <i @click="comingSoon('Add Files')" class="fas fa-2x mx-2 fa-plus "></i>
                <i @click="comingSoon('Add Sticker')" class="fas fa-2x mx-2 fa-surprise"></i>
                <i @click="comingSoon('Add Camera Photos')" class="fas fa-2x mx-2 fa-camera"></i>
              </div>
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
      this.message = ''
    },
    getFriendsData () {
      this.friendsDataAction(this.target.id)
      this.$router.push('/friends')
    },
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    }
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
