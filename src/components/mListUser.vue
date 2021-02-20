<template>
  <div style="height:100vh">
    <!-- List User -->
    <div v-if="toggleChat === false">
      <div class="card-body" style="height:22vh">
        <!-- Title -->
        <div>
          <router-link to="/profile" class="h4 d-inline-block font-weight-bold text-main">Obroline</router-link>
          <h4 @click="logout()" id="popover-button-event2" variant="primary"
            class="d-inline-block text-main float-right text-right h-100"><i class="fas fa-align-left"></i></h4>
        </div>
        <!-- SearchBar -->
        <div class="mt-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="fas fa-search"></i></span>
            </div>
            <input type="text" class="form-control border-0" v-model="searchName" @keyup="searchByName()"
              placeholder="Type your message...">
            <div class="input-group-prepend ">
              <span class="input-group-text font-weight-bold text-main border-0 bg-white" id="basic-addon1"><i
                  class="fas fa-plus"></i></span>
            </div>
          </div>
        </div>
        <!-- Contact Type -->
        <div class="btn-group btn-group-toggle w-100 text-center hideScroll" style="overflow-x:scroll">
          <label v-for="(item, index) in contactType" :key="index" class="btn btn-main font-weight-bolder mx-1"
            style="border-radius:25px">
            <input type="radio"> {{item.text}}
          </label>
        </div>
      </div>
      <div class="card-body" style="height:78vh">
        <!-- Contact List -->
        <ul v-if="searchName.split('').length < 1" class="list-group h-100 hideScroll" style="overflow-y:scroll">
          <li v-for="(item, index) in userList" :key="index"
            @click="getChatUser(item.id, item.name, item.image, item.socketId)"
            class="list-group-item border-0 py-1 px-1">
            <div class="row no-gutters">
              <div class="col-md-3 col-3 col-lg-3 my-auto">
                <img :src="`${webURL}/img/${item.image}`" class="card-img" style="border-radius:18px" alt="...">
              </div>
              <div class="col-md-9 col-9 col-lg-3">
                <div class="card-body">
                  <p class="card-title text-right mb-0 font-weight-light float-right">24:00</p>
                  <p class="mb-0 card-title mb-0 font-weight-bold">{{item.name}}</p>
                  <p class="card-text mb-0 text-main">Last Chat</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else class="list-group h-100 hideScroll" style="overflow-y:scroll">
          <h5>Search Result For {{searchName}}</h5>
          <li v-for="(item, index) in searchList" :key="index"
            @click="getChatUser(item.id, item.name, item.image, item.socketId)"
            class="list-group-item border-0 py-1 px-1">
            <div class="row no-gutters">
              <div class="col-md-3 col-3 col-lg-3 my-auto">
                <img :src="`${webURL}/img/${item.image}`" class="card-img" style="border-radius:18px" alt="...">
              </div>
              <div class="col-md-9 col-9 col-lg-3">
                <div class="card-body">
                  <p class="card-title text-right mb-0 font-weight-light float-right">24:00</p>
                  <p class="mb-0 card-title mb-0 font-weight-bold">{{item.name}}</p>
                  <p class="card-text mb-0 text-main">Last Chat</p>
                </div>
              </div>
            </div>
          </li>
          <h5 v-if="searchList.length <1" class="text-center py-4"> No Result :(</h5>
        </ul>
      </div>
    </div>
    <!-- Chat Details -->
    <div v-else class="h-100">
      <div class="my-auto" style="height:10vh">
        <table class="w-100 h-100">
          <tbody>
            <tr>
              <td rowspan="2" style="width:5%" class="text-center">
                <h1><i class="fas fa-angle-left text-main ml-4" @click="toggleChatbar()"></i></h1>
              </td>
              <td rowspan="2" style="width:25%" class="text-center">
                <img :src="`${webURL}/img/${target.image}`" @click="getFriendsData()"
                  style="heigth:8vh;width:8vh;border-radius:18px" class="text-center img-fluid" alt="...">
              </td>
              <td style="width:70%" class="pb-0 mb-0 h-50">
                <p class="mb-0 text-dark card-title my-0 font-weight-bold">{{target.name}}</p>
              </td>
            </tr>
            <tr>
              <td style="width:70%" class="pt-0 mt-0 h-50">
                <p class="card-text mb-0 text-main">{{target.socketId === null ? 'Offline' : 'Online'}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="card-body hideScroll list-group px-4" style="height:75vh;overflow-y:scroll;list-style:none;"
        id="container">
        <li v-for="(item, index) in chatList" :key="index" class="w-100">
          <div v-if="item.senderName != loginUserData.name">
            <p class="btn ml-1 btn-main mt-1 mb-0 text-justify "
              style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px; max-width:100%; overflow-wrap: break-word">
              {{item.message}}</p>
            <small class="text-left py-0 btn text-secondary w-100"
              style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString()}}</small>
          </div>
          <div v-else class="w-100 text-right">
            <p class="btn mb-0 my-0 py-0 text-justify"
              style="border-top-right-radius:15px;border-bottom-left-radius:15px;border-top-left-radius:15px;overflow-wrap: break-word">
              {{item.message}}</p>
            <small class="text-right py-0 btn text-secondary w-100"
              style="font-size:12px">{{new Date(item.created_at).toLocaleTimeString()}}</small>
          </div>
        </li>
      </ul>
      <div class="card-footer text-center" style="height:15vh">
        <form @submit.prevent="sendChat()" class="w-100 form-inline">
          <div class="row w-100">
            <div class="col-12 col-md-1 col-lg-9 my-auto">
              <input v-model="message" class="form-control w-100" type="text" ref="inputChat"
                placeholder="Type your message ...">
            </div>
            <div class="col-lg-3 col-md-1 mt-2 text-main">
              <i @click="sendChat()" class="far fa-2x mx-2 fa-paper-plane"></i>
              <i @click="comingSoon('Add Files')"
                class="fas fa-2x mx-2 fa-plus d-sm-none d-lg-inline-block d-md-none "></i>
              <i @click="comingSoon('Add Sticker')"
                class="fas fa-2x mx-2 fa-surprise d-sm-none d-lg-inline-block d-md-none "></i>
              <i @click="comingSoon('Add Camera Photos')"
                class="fas fa-2x mx-2 fa-camera d-sm-none d-lg-inline-block d-md-none "></i>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
</template>

<script>
import { obrolinemixin } from '../helper/mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [obrolinemixin],
  data () {
    return {
      toggleChat: false,
      // Data Chat
      targetId: 0,
      targetName: '',
      senderId: 0,
      senderName: '',
      message: '',
      // Data Users
      type: 'important',
      users: [
        { name: 'Alif', id: 2 },
        { name: 'Alif Juga', id: 1 }
      ],
      contactType: [
        { text: 'All', value: '' },
        { text: 'Important', value: 'important' },
        { text: 'Unread', value: 'unread' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      chatList: 'chat/chatList',
      target: 'chat/getTarget',
      loginUserData: 'auth/dataLogin',
      userList: 'chat/userList',
      searchList: 'chat/searchList',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionJoinRoom: 'chat/joinRoom',
      getListChat: 'chat/getListChat',
      actionLogout: 'auth/logout',
      cleanSession: 'chat/disconnected',
      emptyChat: 'chat/emptyChat',
      actionSearchName: 'chat/searchName',
      actionSendChat: 'chat/sendChat',
      friendsDataAction: 'auth/getFriendsData'
    }),
    getChatUser (targetId, targetName, image, socket) {
      this.toggleChat = true
      const data = {
        senderId: this.loginUserData.id,
        targetId: targetId,
        targetName: targetName,
        image: image,
        roomId: this.loginUserData.roomId,
        socketId: socket
      }
      this.getListChat(data)
    },
    logout () {
      this.$swal({
        title: 'Logout',
        text: 'Area you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7E98DF',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.actionLogout()
            .then((response) => {
              this.swalAlert('Logout Success', 'You Are Logged Out', 'success')
              this.emptyChat()
              this.cleanSession()
              this.$router.push('/login')
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    searchByName () {
      const data = {
        id: this.loginUserData.id,
        searchName: this.searchName,
        roomId: this.loginUserData.roomId
      }
      this.actionSearchName(data)
    },
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
      if (this.$el.querySelector('#container')) {
        const containerMessage = this.$el.querySelector('#container')
        containerMessage.scrollTop = containerMessage.scrollHeight
      }
    },
    toggleChatbar () {
      this.toggleChat = !this.toggleChat
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
