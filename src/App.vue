<template>
  <div>
    <navBar :statusnavbar="statusnavbar"></navBar>
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
        statusnavbar: '',
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
      },
      navbar: function() {
        return this.$store.getters.statusnavbar;
      }
    },
    created() {
      var vm = this;
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.$store.dispatch('showNavbar');
          this.$router.push('/painel-de-controle');
          this.$store.dispatch('menuShow');
          this.loadInitial();    
        } else {
          this.$router.push('/')
          this.$store.dispatch('hideNavbar');
          this.$store.dispatch('menuHide');
          this.loadInitial();
        }
      });
    },
    mounted() {
      var vm = this;

      setTimeout(function() {
        vm.loadInitial()
      }, 250)
    },
    methods: {
      loadInitial: function() {
        this.statusnavbar = this.$store.getters.statusnavbar;
      }
    }
  }
</script>

<style scoped>
/*   .navbar-login {
    display: none;
  } */
</style>