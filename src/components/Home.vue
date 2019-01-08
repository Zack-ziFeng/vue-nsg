<template>
  <mt-swipe :show-indicators="false" :speed="500">
    <mt-swipe-item>1</mt-swipe-item>
    <mt-swipe-item>2</mt-swipe-item>
    <mt-swipe-item>3</mt-swipe-item>
  </mt-swipe>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  components: {
    Swipe,
    SwipeItem
  }
}
</script>
<style lang="scss" scoped>
.mint-swipe {
    height: 2.8rem;
}
</style>
