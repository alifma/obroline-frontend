<template>
  <div class="home">
    <div class="row px-0 mx-0">
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
      connected: 'chat/connected',
      getUser: 'auth/getDetailUser',
      getListContactRT: 'chat/getListContactRT',
      newChatRT: 'chat/newChatRT'
    }),
    getUserData () {
      this.getUser(this.id)
        .then((res) => {
          this.holderLogin = res.data.data[0]
          this.getChatList()
          this.connected(res.data.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getChatList () {
      this.actionJoinRoom(this.holderLogin.roomId)
      this.getListUser(this.holderLogin)
    }
  },
  mounted () {
    this.getListContactRT()
    this.getUserData()
    this.newChatRT()
  }
}
</script>
