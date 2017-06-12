<template>
  <main class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon button" v-on:click.native="openMenu">
        <md-icon>M</md-icon>
      </md-button>
      <h1 class="md-title">{{ title_shop }}</h1>
    </md-toolbar> 

    <md-sidenav class="md-left open" ref="leftMenu">
      <md-toolbar class="md-medium">
        <div class="md-toolbar-container">
          <h3 class="md-title">Menu</h3>
        </div>
      </md-toolbar>

      <md-list class="">
        <md-list-item class="">Perfil</md-list-item>
        <md-list-item class="">
          <router-link to="/categories" v-on:click.native="closeMenu">Categorias</router-link>
        </md-list-item>
        <md-list-item class="">
        <router-link to="/products" v-on:click.native="closeMenu">Produtos</router-link>
        </md-list-item>
        <md-list-item class="">Sair</md-list-item>
      </md-list>
    </md-sidenav>

    <md-row>
      <router-view></router-view> 
    </md-row>

  </main>
</template>

<script>
  export default {
    name: 'MiniEcommerce',

    data () {
      return {
        title_shop: 'Turtle Shop'
      }
    },

    methods: {
      openMenu: function () {
        this.$refs.leftMenu.toggle();
      },
      closeMenu: function() {
        this.$refs.leftMenu.close();
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
