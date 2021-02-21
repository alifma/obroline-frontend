<template>
  <div class="h-100" style="height:100vh">
    <div v-if="friendsData.username !== undefined" class="card-body py-0">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main">@{{friendsData.username}}</h5>
        <router-link to="/" class="d-inline-block text-main float-left text-right h-100"><i
            class="fas fa-angle-left"></i></router-link>
      </div>
      <!-- Base Info -->
      <div class="text-center" style="height:50vh">
        <img :src="`${webURL}/img/${friendsData.image}`" class="img-fluid w-25 my-4" alt="">
        <br>
        <div id="friendship" class="text-left">
          <h5 v-if="friendsData.isfriends === false" class="text-left font-weight-bold mt-3 d-inline-block">
            {{friendsData.name}} <span @click="addFriends(friendsData.id, friendsData.roomId)"
              class="badge badge-warning"><i class="fas fa-plus"></i> Add</span></h5>
          <h5 v-else class="text-left font-weight-bold mt-3 d-inline-block">{{friendsData.name}} <span
              @click="deleteFriends(friendsData.id, friendsData.roomId)" class="badge badge-warning">Friends</span></h5>
        </div>
        <p class="text-left">Online</p>
        <p class="text-left font-weight-bold mb-0">Phone number</p>
        <p class="text-left">{{friendsData.handphone}}</p>
      </div>
      <div style="height:8vh">
        <div class="btn-group btn-group-toggle w-100">
          <label v-for="(item, index) in chatDataType" :key="index" class="btn btn-sm btn-main font-weight-bolder mx-1"
            style="border-radius:25px">
            <input @click="setClickedType(item.value)" type="radio"> {{item.text}}
          </label>
        </div>
      </div>
      <!-- Detail Info -->
      <div style="height:35vh;overflow-y:scroll" class="hideScroll">
        <div v-if="clickedType === 'location'">
          <GoogleMapMaps
            :center="{lat: Number(friendsData.location.split(',')[0]), lng:Number(friendsData.location.split(',')[1])}"
            :zoom="15" map-type-id="terrain" style="width: 100%; height: 300px" class="img-fluid">
            <GoogleMapMarker
              :position="{lat: Number(friendsData.location.split(',')[0]), lng:Number(friendsData.location.split(',')[1])}"
              :clickable="true" :draggable="false" @click="center=m.position"></GoogleMapMarker>
          </GoogleMapMaps>
        </div>
        <div v-else-if="clickedType === 'image'">
          <div class="row">
            <div v-for="index in dummyImage" :key="index" class="col-md-4 col-lg-4 col-4">
              <img :src="`${webURL}/img/sampleImg_${index}.png`" class="img-fluid px-1 py-1" alt="">
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in dummyFile" :key="index">
            <div :class="`alert alert-${item.type}`" role="alert">
              <i :class="`${item.icon}`"></i> {{item.text}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-body py-auto">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main">Back to List User</h5>
        <router-link to="/" class="d-inline-block text-main float-left text-right h-100"><i
            class="fas fa-angle-left"></i></router-link>
        <br>
        <div class="text-center mt-5 pt-5 h-100 d-flex-column justify-content-center">
          <img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" />
          <h3 class="text-secondary">Please re-select Your Friends</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { obrolinemixin } from '../helper/mixin'
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  mixins: [obrolinemixin],
  Name: 'mFriendsProfile',
  data () {
    return {
      detailFriends: {},
      dummyImage: 15,
      id: localStorage.getItem('id'),
      roomId: localStorage.getItem('roomId'),
      chatDataType: [
        { text: 'Location', value: 'location' },
        { text: 'Image', value: 'image' },
        { text: 'Documents', value: 'document' }
      ],
      clickedType: 'location',
      dummyFile: [
        { type: 'success', text: 'ExcelTugas.xlsx', icon: 'far fa-file-excel' },
        { type: 'danger', text: 'Kontrak.pdf', icon: 'far fa-file-pdf' },
        { type: 'info', text: 'Skripsi.docx', icon: 'far fa-file-word' },
        { type: 'warning', text: 'PPTTugas.pptx', icon: 'far fa-file-powerpoint' },
        { type: 'danger', text: 'Kontrak.pdf', icon: 'far fa-file-pdf' },
        { type: 'warning', text: 'PPTTugas.pptx', icon: 'far fa-file-powerpoint' }
      ]
    }
  },
  components: {
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  computed: {
    ...mapGetters({
      friendsData: 'auth/dataFriends',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionUpdate: 'auth/updateUser',
      getUserProfile: 'auth/getDetailUser',
      actionFriendsProfile: 'auth/getFriendsData',
      actionAdd: 'chat/addFriends',
      actionDelete: 'chat/deleteFriends'
    }),
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    },
    setClickedType (data) {
      this.clickedType = data
    },
    addFriends (id, roomId) {
      const data = {
        userId: Number(this.id),
        userRoomId: Number(this.roomId),
        targetId: id,
        status: 'friends',
        targetRoomId: roomId
      }
      this.actionAdd(data)
        .then((res) => {
          this.actionFriendsProfile(this.friendsData.id)
          this.swalAlert('Add Success', 'You are now Friends', 'success')
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteFriends (id, roomId) {
      const data = {
        userId: Number(this.id),
        userRoomId: Number(this.roomId),
        targetId: id,
        status: 'friends',
        targetRoomId: roomId
      }
      this.actionDelete(data)
        .then((res) => {
          this.actionFriendsProfile(this.friendsData.id)
          this.swalAlert('Friendship Removed', 'You are can now be friends', 'success')
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProfile () {
      this.getUserProfile(this.id)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
