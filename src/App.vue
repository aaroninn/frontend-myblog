<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    var token = this.$cookie.get('pass')
    var userid = this.$cookie.get('userid')
    var data = {
      userid: userid,
      token: token
    }
    this.$store.dispatch('setUserInfo', data)
    var host = window.location.host
    host = host.split('.')[0]
    if (host === 'www' || host.split(':')[0] === 'localhost' || host === 'mycodetour') {
      host = 'admin'
    }
    this.$store.state.host = host
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
div {
  box-sizing: border-box;
}
</style>
