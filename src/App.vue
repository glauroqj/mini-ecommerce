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
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.shownavbar = true;
          this.$router.push('/painel-de-controle')
        } else {
          this.$router.push('/')
          this.shownavbar = false;
        }
      });
    },
    mounted() {
      var vm = this;
      let store = this.$store
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