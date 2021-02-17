<template>
  <div class="col-12 col-md-4 col-lg-4 mx-0 px-0">
    <div class="card">
      <div class="card-header">
        <h3>Friendlist</h3>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li v-for="(item, index) in userList" :key="index" @click="getChatUser(item.id, item.name)"  class="list-group-item">{{item.name}}</li>
        </ul>
      </div>
      <div class="card-footer">
        <p class="mb-0 text-center"><span class="text-main">{{users.length}}</span> Friend(s) are online</p>
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
      users: [
        { name: 'Alif', id: 2 },
        { name: 'Alif Juga', id: 1 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loginUserData: 'auth/dataLogin',
      userList: 'chat/userList'
    })
  },
  methods: {
    ...mapActions({
      actionJoinRoom: 'chat/joinRoom',
      getListUser: 'chat/getListUsers',
      getListChat: 'chat/getListChat'
    }),
    getChatUser (targetId, targetName) {
      const data = {
        senderId: this.loginUserData.id,
        targetId: targetId,
        targetName: targetName,
        roomId: this.loginUserData.roomId
      }
      this.getListChat(data)
    }
  },
  mounted () {
    this.actionJoinRoom(this.loginUserData.roomId)
    this.getListUser(this.loginUserData)
  }

}
</script>
