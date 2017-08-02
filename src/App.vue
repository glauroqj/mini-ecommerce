<template>
  <div>
    <div v-if="login == false">
    </div>
      <navBar></navBar>
    <router-view></router-view> 
  </div>
</template>

<script>
  import Firebase from 'firebase'
  import navBar from './components/NavBar.vue'

  export default {
    name: 'Portfolio',

    data () {
      return {
        login: true
      }
    },
    components:{
      'navBar': navBar
    },
    methods: {
    }
  }
</script>

<style scoped>
/*   .navbar-login {
    display: none;
  } */
</style>