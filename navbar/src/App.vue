<template>
  <div id="navbar-app">
    <div id="nav">
      <router-link to="/app1">App1</router-link> |
      <router-link to="/app2">App2</router-link> |
      <router-link to="/admin-front">admin-front</router-link> |
      <router-link to="/custorm">custorm</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#navbar-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
