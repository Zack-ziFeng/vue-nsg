<template>
  <div id="app">
    <headerLy>
      <input type="text"/>
    </headerLy>
    <router-view></router-view>
    <footerLy></footerLy>
  </div>
</template>

<script>
import footerLy from '@/components/footer.vue'
import headerLy from '@/components/header.vue'

export default {
  name: 'App',
  components: {
    headerLy,
    footerLy
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
