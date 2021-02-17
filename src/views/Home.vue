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

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    ListUser,
    ListChat
  },
  computed: {
  },
  methods: {
  }
}
</script>
