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

</style>
