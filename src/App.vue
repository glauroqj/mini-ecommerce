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
      this.loadInitial();
      // this.$store.watch(
      //   function (state) {
      //     return state.navbar;
      //   },
      //   function () {
      //   //do something on data change
      //   console.log('inside watch store')
      // },
      // {
      //   deep: true //add this if u need to watch object properties change etc.
      // }
      // );
      let store = this.$store
      store.watch(
        function (state) {
          return state.navbar;
          console.log(state)
        },
        function () {
        //do something on data change
        console.log('inside watch store')
      }
      );
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