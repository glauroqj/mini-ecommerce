<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">
            <h1 class="md-title">{{ title_shop }}</h1>
          </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </div>
      </div>
    </nav> 

    <div class="container">
      <div class="row">  
        <router-view></router-view> 
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MiniEcommerce',

    data () {
      return {
        title_shop: 'Pet Shop'
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
