<template>
  <div style="height:100vh">
    <div class="card-body" style="height:22%">
      <!-- Title -->
      <div>
        <h4 class="h4 d-inline-block font-weight-bold text-main">Obroline</h4>
        <h4 id="popover-button-event" variant="primary" class="d-inline-block text-main float-right text-right h-100"><i class="fas fa-align-left"></i></h4>
        <b-popover ref="popover" placement="right" class="btn-main btn" target="popover-button-event">
          <template #title class="text-main">Options</template>
          <router-link to="/profile" class="font-weight-bold font-rubik text-main">Profile</router-link>
          <p @click="logout()" class="font-weight-bold font-rubik text-main">Logout</p>
        </b-popover>
      </div>
      <!-- SearchBar -->
      <div class="mt-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control border-0" v-model="searchName" @keyup="searchByName()" placeholder="Type your message...">
          <div class="input-group-prepend ">
            <span class="input-group-text font-weight-bold text-main border-0 bg-white" id="basic-addon1"><i
                class="fas fa-plus"></i></span>
          </div>
        </div>
      </div>
      <!-- Contact Type -->
      <div class="btn-group btn-group-toggle w-100 text-center hideScroll" style="overflow-x:scroll" >
        <label v-for="(item, index) in contactType" :key="index" class="btn btn-main font-weight-bolder mx-1"
          style="border-radius:25px">
          <input type="radio"> {{item.text}}
        </label>
      </div>
    </div>
    <div class="card-body" style="height:78%">
      <!-- Contact List -->
      <ul v-if="searchName.split('').length < 1" class="list-group h-100 hideScroll"  style="overflow-y:scroll">
        <li v-for="(item, index) in userList" :key="index" @click="getChatUser(item.id, item.name, item.image, item.socketId)"
          class="list-group-item border-0 py-1 px-1">
            <div class="row no-gutters">
              <div class="col-md-3 my-auto">
                <img :src="`${webURL}/img/${item.image}`" class="card-img" alt="...">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <p class="card-title text-right mb-0 font-weight-light float-right">24:00</p>
                  <p class="mb-0 card-title mb-0 font-weight-bold">{{item.name}}</p>
                  <p class="card-text mb-0 text-main">Last Chat</p>
                </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else class="list-group h-100 hideScroll"  style="overflow-y:scroll">
        <h5 >Search Result For {{searchName}}</h5>
          <li v-for="(item, index) in searchList" :key="index" @click="getChatUser(item.id, item.name, item.image, item.socketId)"
          class="list-group-item border-0 py-1 px-1">
            <div class="row no-gutters">
              <div class="col-md-3 my-auto">
                <img :src="`${webURL}/img/${item.image}`" class="card-img" alt="...">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <p class="card-title text-right mb-0 font-weight-light float-right">24:00</p>
                  <p class="mb-0 card-title mb-0 font-weight-bold">{{item.name}}</p>
                  <p class="card-text mb-0 text-main">Last Chat</p>
                </div>
            </div>
          </div>
        </li>
      </ul>
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
      actionSearchName: 'chat/searchName'
    }),
    getChatUser (targetId, targetName, image, socket) {
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
    }
  },
  mounted () {
  }

}
</script>
