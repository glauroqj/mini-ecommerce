<template>
  <div>
    <navBar></navBar>
    <div v-if="navbar == true">
    </div>
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
        navbar: false,
        user: ''
      }
    },
    components:{
      'navBar': navBar
    },
    mounted() {
      this.loadInitial()
    },
    methods: {
      loadInitial: function() {
        var vm = this;
        vm.user = Firebase.auth().currentUser;
        if (vm.user) {
          vm.navbar = true;
        }
      }
    }
  }
</script>

<style scoped>
/*   .navbar-login {
    display: none;
  } */
</style>