<template>
  <div>
    <template v-if="loading">
      <div class="row-fluid">
        <div class="col-xs-12 text-center">
         <loading :height="80" :width="80"></loading>
       </div>
     </div>
   </template>

   <template v-else>
    <navBar :statusnavbar="statusnavbar"></navBar>
    <div class="row-fluid">
      <aside class="col-xs-3">
        <sideMenu :statusMenu="menuChange"></sideMenu>
      </aside>
      <div class="col-xs-9">
        <router-view></router-view>
      </div>
    </div>
  </template>

</div>
</template>

<script>
import Firebase from 'firebase'
import navBar from './components/NavBar.vue'
import sideMenu from './components/SideMenu.vue'
import loading from './components/Loading.vue'

export default {
  name: 'Portfolio',

  data () {
    return {
      statusnavbar: '',
      user: '',
      login: true,
      loading: true
    }
  },
  components:{
    'navBar': navBar,
    'sideMenu': sideMenu,
    'loading': loading
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
      vm.loading = true;
      setTimeout(function() {
        if (user) {
          vm.user = user;
          vm.$store.dispatch('showNavbar');
          vm.$router.push('/painel-de-controle');
          vm.$store.dispatch('menuShow');
          vm.login = false;
          vm.loading = false;
          vm.loadInitial();
        } else {
          vm.$router.push('/')
          vm.$store.dispatch('hideNavbar');
          vm.$store.dispatch('menuHide');
          vm.loading = false;
          vm.loadInitial();
        }
      }, 1000);
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
</style>