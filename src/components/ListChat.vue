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
              <p class="mb-0 card-title mb-0 font-weight-bold">{{target.name}}</p>
              <p class="card-text mb-0 text-main">Online</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body hideScroll" style="height:75vh;overflow-y:scroll">
        <div v-for="(item, index) in chatList" :key="index" class="w-100">
          <!-- <p v-if="item.senderName != loginUserData.name"><b>{{item.senderName}} : </b> {{item.message}}</p> -->
          <p v-if="item.senderName != loginUserData.name" class="btn btn-main" style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px">{{item.message}}</p>
          <p v-else class="text-right">{{item.message}}</p>
        </div>
      </div>
      <div class="card-footer text-center" style="height:15vh">
        <form @submit.prevent="sendChat()" class="w-100 form-inline">
          <input v-model="message" class="form-control w-75" type="text">
          <button type="submit" class="btn btn-main w-25">Send</button>
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
<style scoped>
.verticalCenter {
  min-height: 10em;
  display: table-cell;
  vertical-align: middle
}
</style>
