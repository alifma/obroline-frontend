<template>
  <div class="h-100" style="height:100vh">
    <div class="card-body py-0">
      <div class="text-center pt-4" style="height:5vh">
        <h5 class="d-inline-block text-center text-main" >@{{friendsData.username}}</h5>
        <router-link to="/" class="d-inline-block text-main float-left text-right h-100"><i
            class="fas fa-angle-left"></i></router-link>
      </div>
      <!-- Base Info -->
      <div class="text-center" style="height:42vh">
        <img :src="`${webURL}/img/${friendsData.image}`"  class="img-fluid w-25 my-4" alt="">
        <h5 class="text-left font-weight-bold">{{friendsData.name}}</h5>
        <p class="text-left">Online</p>
        <p class="text-left font-weight-bold mb-0">Phone number</p>
        <p class="text-left">{{friendsData.handphone}}</p>
      </div>
        <div style="height:8vh">
          <div class="btn-group btn-group-toggle w-100">
            <label v-for="(item, index) in chatDataType" :key="index"
              class="btn btn-sm btn-main font-weight-bolder mx-1" style="border-radius:25px">
              <input @click="setClickedType(item.value)" type="radio"> {{item.text}}
            </label>
          </div>
        </div>
      <!-- Detail Info -->
      <div style="height:45vh;overflow-y:scroll" class="hideScroll">
        <div v-if="clickedType === 'location'">
          <GoogleMapMaps :center="{lat: -6.307946155560761, lng:106.11077392283725}" :zoom="10"
            map-type-id="terrain" style="width: 300px; height: 300px" class="img-fluid">
            <GoogleMapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
              :clickable="true" :draggable="true" @click="center=m.position"></GoogleMapMarker>
          </GoogleMapMaps>
        </div>
        <div v-else-if="clickedType === 'image'">
          <div class="row">
            <div v-for="index in dummyImage" :key="index" class="col-md-4 col-lg-4 col-4">
              <img :src="`${webURL}/img/sampleImg_${index}.png`" class="img-fluid px-1 py-1" alt="">
            </div>
          </div>
        </div>
        <div v-else>Data Dokument</div>
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
  Name: 'Profile',
  data () {
    return {
      detailFriends: {},
      dummyImage: 15,
      chatDataType: [
        { text: 'Location', value: 'location' },
        { text: 'Image', value: 'image' },
        { text: 'Documents', value: 'document' }
      ],
      clickedType: 'location',
      markers: [
        {
          position: {
            lat: -6.307946155560761, lng: 106.11077392283725
          }
        }
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
      getUserProfile: 'auth/getDetailUser'
    }),
    comingSoon (msg) {
      this.swalAlert('Comming Soon', msg, 'info')
    },
    setClickedType (data) {
      this.clickedType = data
    }
    // getProfile () {
    //   this.getUserProfile(this.id)
    //     .then((res) => {
    //       console.log(res)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  },
  mounted () {
    // this.getProfile()
  }
}
</script>

<style>

</style>
