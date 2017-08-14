<template>
  <div>
    <navBar :shownavbar="shownavbar"></navBar>
    <div class="row-fluid">
      <aside class="col-xs-3">
        <sideMenu :statusMenu="menuChange"></sideMenu>
      </aside>
      <div class="col-xs-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase'
  import navBar from './components/NavBar.vue'
  import sideMenu from './components/SideMenu.vue'

  export default {
    name: 'Portfolio',

    data () {
      return {
        shownavbar: false,
        user: ''
      }
    },
    components:{
      'navBar': navBar,
      'sideMenu': sideMenu
    },
    computed: {
      menuChange: function() {
        return this.$store.getters.menuChange;
      }
    },
    created() {
      var vm = this;
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.shownavbar = true;
          this.$store.dispatch('login');
          this.$router.push('/painel-de-controle');
          this.$store.dispatch('menuShow');        
        } else {
          this.$router.push('/')
          this.$store.dispatch('logout');
          this.shownavbar = false;
          this.$store.dispatch('menuHide');
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