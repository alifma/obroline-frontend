<template>
  <div class="h-100" style="height:100vh">
    <div class="card-body py-0">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main">@{{loginUserData.username}}</h5>
        <router-link to="/" class="d-inline-block text-main float-left text-right h-100"><i
            class="fas fa-angle-left"></i></router-link>
      </div>
      <!-- Base Info -->
      <div class="text-center" style="height:30vh">
        <img :src="`${webURL}/img/default.png`" class="img-fluid w-25 my-4" alt="">
        <h5 class="font-weight-bold">{{loginUserData.name}}</h5>
        <p>@{{loginUserData.username}}</p>
      </div>
      <!-- Detail Info -->
      <div style="height:65vh;overflow-y:scroll" class="hideScroll">
        <p class="font-weight-bold mb-1">Account</p>
        <p class="mb-0">{{loginUserData.handphone}}</p>
        <small class="text-main">Tap to change phone number</small>
        <hr>
        <p class="font-weight-bold mb-1">{{loginUserData.username}}</p>
        <small>Username</small>
        <hr>
        <p class="font-weight-bold mb-1 text-justify">{{loginUserData.bio}}</p>
        <small>Bio</small>
        <hr>
        <p class="font-weight-bold mb-1">Settings</p>
        <table class="table table-borderless">
          <tbody>
            <tr v-for="(item, index) in configList" :key="index">
              <th style="width:10%"><i :class="`${item.icon}`"></i></th>
              <td @click="comingSoon(item.text)">{{item.text}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
export default {
  mixins: [obrolinemixin],
  Name: 'Profile',
  data () {
    return {
      configList: [{ icon: 'far fa-bell', text: 'Notification and Sounds' },
        { icon: 'fas fa-lock', text: 'Privacy and Security' },
        { icon: 'fas fa-chart-line', text: 'Data and Storage' },
        { icon: 'fas fa-bars', text: 'Chat Settings' },
        { icon: 'fas fa-laptop ', text: 'Device' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loginUserData: 'auth/dataLogin',
      webURL: 'webURL'
    })
  },
  methods: {
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    }
  }
}
</script>

<style>

</style>
