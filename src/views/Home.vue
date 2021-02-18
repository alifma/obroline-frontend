<template>
  <div class="home">
    <div class="row px-0 mx-0">
      <h1>{{holderLogin}}</h1>
      <div class="col-12 col-md-4 col-lg-3 mx-0 px-0" style="height:100vh">
        <ListUser />
      </div>
      <div class="col-12 col-md-8 col-lg-9 mx-0 px-0" style="height:100vh">
        <ListChat />
      </div>
    </div>
  </div>
</template>

<script>
import ListUser from '../components/ListUser'
import ListChat from '../components/ListChat'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      id: localStorage.getItem('id'),
      roomId: localStorage.getItem('roomId'),
      holderLogin: {}
    }
  },
  components: {
    ListUser,
    ListChat
  },
  computed: {
    ...mapGetters({
      loginData: 'auth/dataLogin',
      loginId: 'auth/loginId',
      loginRoomId: 'auth/loginRoomId',
      userList: 'chat/userList'
    })
  },
  methods: {
    ...mapActions({
      actionJoinRoom: 'chat/joinRoom',
      getListUser: 'chat/getListUsers',
      getUser: 'auth/getDetailUser'
    }),
    getUserFriends () {
      this.getUser(this.id)
        .then((res) => {
          this.holderLogin = res.data.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getChatList () {
      const data = {
        id: this.loginData.id,
        idLS: this.loginId !== this.loginData.id ? this.loginData.id = this.loginid : this.loginId,
        roomId: this.loginData.roomId,
        roomIdLS: this.loginRoomId
      }
      console.log(data)
      this.actionJoinRoom(this.loginData.roomId)
      this.getListUser(data)
    }
  },
  mounted () {
    this.getUserFriends()
  }
}
</script>
