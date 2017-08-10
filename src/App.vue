<template>
  <div>
    <navBar :shownavbar="shownavbar"></navBar>
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
        shownavbar: false,
        user: ''
      }
    },
    components:{
      'navBar': navBar
    },
    created() {
      var vm = this;
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.shownavbar = true;
          this.$store.dispatch('login');
          this.$router.push('/painel-de-controle')          
        } else {
          this.$router.push('/')
          this.$store.dispatch('logout');
          this.shownavbar = false;
        }
      });
    },
    mounted() {

    },
    methods: {
      loadInitial: function() {
        var vm = this;
      }
    }
  }
</script>

<style scoped>
/*   .navbar-login {
    display: none;
  } */
</style>