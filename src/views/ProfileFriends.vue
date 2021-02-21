<template>
  <div class="home">
    <!-- Web View -->
    <div class="d-none d-lg-block d-md-block">
      <div class="row px-0 mx-0">
        <div class="col-12 col-md-8 col-lg-9 mx-0 px-0" style="height:100vh">
          <ListChat />
        </div>
        <div class="col-12 col-md-4 col-lg-3 mx-0 px-0" style="height:100vh">
          <ProfileFriends />
        </div>
      </div>
    </div>
    <!-- Mobile View -->
    <div class="d-block d-lg-none d-md-none">
      <mProfileFriends />
    </div>
  </div>
</template>

<script>
import ProfileFriends from '../components/ProfileFriends'
import mProfileFriends from '../components/mProfileFriends'
import ListChat from '../components/ListChat'

export default {
  name: 'ProfileFriends',
  data () {
    return {
    }
  },
  components: {
    ProfileFriends,
    mProfileFriends,
    ListChat
  }
}
</script>
