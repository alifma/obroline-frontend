<template>
  <div class="h-100" style="height:100vh">
    <!-- If edited -->
    <div v-if="toggleEdit" class="card-body py-0">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main">Edit Profile</h5>
        <p @click="switchToggle()" class="d-inline-block text-main float-left h-100"><i
            class="fas fa-angle-left"></i></p>
      </div>
      <!-- Base Info -->
      <div class="text-center" style="height:20vh">
        <img :src="`${webURL}/img/${loginUserData.image}`" class="img-fluid w-25 my-4" alt="">
      </div>
      <!-- Detail Info -->
      <div style="height:75vh;overflow-y:scroll" class="hideScroll">
      <form action="" @submit.prevent="updateProfile()">
        <p class="font-weight-bold mb-1">Account</p>
        <input type="file" class="form-control w-100 p-1" @change="processFile($event)" >
        <small>Profile Picture</small>
        <hr>
        <input type="text" v-model="holderEdit.username" class="font-weight-bold form-control w-100" :placeholder="loginUserData.username">
        <small>Username</small>
        <hr>
        <input type="text" v-model="holderEdit.name" class="font-weight-bold form-control w-100" :placeholder="loginUserData.name">
        <small>Full Name</small>
        <hr>
        <input type="email" v-model="holderEdit.email" class="font-weight-bold form-control w-100" :placeholder="loginUserData.email">
        <small>Email</small>
        <hr>
        <input type="text" v-model="holderEdit.handphone" class="p form-control w-100" :placeholder="loginUserData.handphone">
        <small>Handphone</small>
        <hr>
        <input type="text" v-model="holderEdit.bio" class="font-weight-bold form-control text-justify w-100" :placeholder="loginUserData.bio">
        <small>Bio</small>
        <hr>
        <input type="text" v-model="holderEdit.location" class="font-weight-bold form-control text-justify w-100" :placeholder="loginUserData.location">
        <small>Location</small>
        <hr>
        <button class="btn btn-main w-100 mb-4" style="border-radius:18px" type="submit">Update</button>
      </form>
      </div>
    </div>
    <!-- End If Edited -->
    <!-- If not Edited -->
    <div v-else class="card-body py-0">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main" >@{{loginUserData.username}}</h5>
        <router-link to="/" class="d-inline-block text-main float-left text-right h-100"><i
            class="fas fa-angle-left"></i></router-link>
        <p @click="switchToggle()" class="d-inline-block text-main float-right h-100 mb-0"><i class="fa fa-pencil"></i></p>
      </div>
      <!-- Base Info -->
      <div class="text-center" style="height:30vh">
        <img :src="`${webURL}/img/${loginUserData.image}`"  class="img-fluid w-25 my-4" alt="">
        <h5 class="font-weight-bold">{{loginUserData.name}}</h5>
        <p>@{{loginUserData.username}}</p>
      </div>
      <!-- Detail Info -->
      <div style="height:65vh;overflow-y:scroll" class="hideScroll">
        <p class="font-weight-bold mb-1">Account</p>
        <p class="mb-0">{{loginUserData.handphone}}</p>
        <small class="text-main" @click="switchToggle()" >Tap to change phone number</small>
        <hr>
        <p class="font-weight-bold mb-1">{{loginUserData.username}}</p>
        <small>Username</small>
        <hr>
        <p class="font-weight-bold mb-1 text-justify">{{loginUserData.bio}}</p>
        <small>Bio</small>
        <hr>
        <p class="font-weight-bold mb-0 text-justify">lat: {{loginUserData.location.split(',')[0]}}</p>
        <p class="font-weight-bold mb-1 text-justify">lng: {{loginUserData.location.split(',')[1]}}</p>
        <small>Location</small>
          <GoogleMapMaps :center="{lat: Number(loginUserData.location.split(',')[0]), lng: Number(loginUserData.location.split(',')[1])}" :zoom="15"
            map-type-id="terrain" style="width: 100%; height: 300px" class="img-fluid">
            <GoogleMapMarker :position="{lat: Number(loginUserData.location.split(',')[0]), lng: Number(loginUserData.location.split(',')[1])}"
              :clickable="true" :draggable="false" @click="center=m.position"></GoogleMapMarker>
          </GoogleMapMaps>
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
    <!-- End If Not Edited -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  mixins: [obrolinemixin],
  data () {
    return {
      id: localStorage.getItem('id'),
      toggleEdit: false,
      configList: [{ icon: 'far fa-bell', text: 'Notification and Sounds' },
        { icon: 'fas fa-lock', text: 'Privacy and Security' },
        { icon: 'fas fa-chart-line', text: 'Data and Storage' },
        { icon: 'fas fa-bars', text: 'Chat Settings' },
        { icon: 'fas fa-laptop ', text: 'Device' }
      ],
      holderEdit: {
        id: 0,
        handphone: '',
        image: '',
        username: '',
        name: '',
        bio: '',
        location: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      loginUserData: 'auth/dataLogin',
      webURL: 'webURL'
    })
  },
  components: {
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  methods: {
    ...mapActions({
      actionUpdate: 'auth/updateUser',
      getUserProfile: 'auth/getDetailUser'
    }),
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    },
    switchToggle () {
      this.toggleEdit = !this.toggleEdit
    },
    mountedData () {
      this.holderEdit.id = this.loginUserData.id
      this.holderEdit.handphone = this.loginUserData.handphone
      this.holderEdit.image = this.loginUserData.image
      this.holderEdit.username = this.loginUserData.username
      this.holderEdit.name = this.loginUserData.name
      this.holderEdit.bio = this.loginUserData.bio
      this.holderEdit.email = this.loginUserData.email
      this.holderEdit.location = this.loginUserData.location
    },
    processFile (el) {
      this.holderEdit.image = el.target.files[0]
    },
    updateProfile () {
      this.swalLoading('Updating Data')
      const fd = new FormData()
      fd.append('handphone', this.holderEdit.handphone)
      fd.append('image', this.holderEdit.image)
      fd.append('username', this.holderEdit.username)
      fd.append('name', this.holderEdit.name)
      fd.append('bio', this.holderEdit.bio)
      fd.append('location', this.holderEdit.location)
      fd.append('email', this.holderEdit.email)
      const fixData = {
        id: this.holderEdit.id,
        fd
      }
      this.actionUpdate(fixData)
        .then((response) => {
          if (response.data.code === 200) {
            this.swalLoadingClose()
            this.toggleEdit = false
            this.getProfile()
            this.swalAlert('Update Data Success', '', 'success')
          } else {
            this.swalAlert('Update Data Failed', response.data.msg, 'error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProfile () {
      this.getUserProfile(this.id)
        .then((res) => {
          this.mountedData()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>

<style>

</style>
