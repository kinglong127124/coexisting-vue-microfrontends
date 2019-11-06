<template>
  <div class="home">
    <router-link to="/about">about  navbar about page</router-link>
    <div>|</div>
    <router-link to="/home">home  navbar about pagenavbar about page</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
