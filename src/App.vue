<template>
  <div id="app">
    <router-view/>
    <Btn-Link></Btn-Link>
  </div>
</template>

<script>
import BtnLink from '@/components/BtnLink'

export default {
  name: 'App',
  components: {
    BtnLink
  }
}
</script>

<style>

</style>
