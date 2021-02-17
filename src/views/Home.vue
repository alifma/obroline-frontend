<template>
  <div class="home">
    <div class="row px-0 mx-0">
      <ListUser />
      <ListChat />
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
