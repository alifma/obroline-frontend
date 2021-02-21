<template>
  <div class="home">
    <!-- Display on Web -->
    <div class="d-none d-lg-block d-md-block">
      <div class="row px-0 mx-0">
        <div class="col-12 col-md-4 col-lg-3 mx-0 px-0" style="height:100vh">
          <Profile />
        </div>
        <div class="col-12 col-md-8 col-lg-9 mx-0 px-0" style="height:100vh">
          <ListChat />
        </div>
      </div>
    </div>
    <!-- Display on Phone -->
    <div class="d-block d-lg-none d-md-none">
      <mProfile />
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile'
import mProfile from '../components/mProfile'
import ListChat from '../components/ListChat'

export default {
  name: 'Profile',
  data () {
    return {
    }
  },
  components: {
    Profile,
    mProfile,
    ListChat
  }
}
</script>
