<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="!this.$route.meta.noCache">
        <router-view :key="key"/>
      </keep-alive>
      <router-view v-if="this.$route.meta.noCache" :key="key"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    isKeepAlive() {
      // if (this.$route && this.$route.name && !this.$route.meta.noCache) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    key() {
      return this.$route.fullPath
    }
  }
};
</script>
