<template>
  <div style="height:100vh">
    <div class="card-body" style="height:22%">
      <!-- Title -->
      <div>
        <router-link to="/profile" class="h4 d-inline-block text-main">Obroline</router-link>
        <h4 @click="logout()" class="d-inline-block text-main float-right text-right h-100"><i class="fas fa-align-left"></i></h4>
      </div>
      <!-- SearchBar -->
      <div class="mt-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control border-0" placeholder="Type your message...">
          <div class="input-group-prepend ">
            <span class="input-group-text font-weight-bold text-main border-0 bg-white" id="basic-addon1"><i
                class="fas fa-plus"></i></span>
          </div>
        </div>
      </div>
      <!-- Contact Type -->
      <div class="btn-group btn-group-toggle w-100" >
        <label v-for="(item, index) in contactType" :key="index" class="btn btn-main font-weight-bolder mx-1"
          style="border-radius:25px">
          <input type="radio"> {{item.text}}
        </label>
      </div>
    </div>
    <div class="card-body" style="height:78%">
      <!-- Contact List -->
      <ul class="list-group h-100 hideScroll"  style="overflow-y:scroll">
        <li v-for="(item, index) in userList" :key="index" @click="getChatUser(item.id, item.name, item.image)"
          class="list-group-item border-0">
            <div class="row no-gutters">
              <div class="col-md-3 my-auto">
                <img :src="`${webURL}/img/${item.image}`" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="mb-0 card-title mb-0 font-weight-bold">{{item.name}}</p>
                  <p class="card-text mb-0 text-main">Last Chat</p>
                </div>
            </div>
            <div class="col-1">
              <p class="card-title text-right mb-0 font-weight-light">24:00</p>
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
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionJoinRoom: 'chat/joinRoom',
      getListUser: 'chat/getListUsers',
      getListChat: 'chat/getListChat',
      actionLogout: 'auth/logout',
      emptyChat: 'chat/emptyChat'
    }),
    getChatUser (targetId, targetName, image) {
      const data = {
        senderId: this.loginUserData.id,
        targetId: targetId,
        targetName: targetName,
        image: image,
        roomId: this.loginUserData.roomId
      }
      this.getListChat(data)
    },
    logout () {
      this.actionLogout()
        .then((response) => {
          this.swalAlert('Logout Success', 'You Are Logged Out', 'success')
          this.emptyChat()
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    // this.actionJoinRoom(this.loginUserData.roomId)
    // this.getListUser(this.loginUserData)
  }

}
</script>
