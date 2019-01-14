<template>
  <div>
    <div v-html="goodsD.data" ref="box"></div>
    <div id="bottom"></div>
  </div>
</template>

<script>
export default {
  props: ["goodsD"],
  mounted () {
    let box = this.$refs.box
    box.style.fontSize = '14px'
  }
};
</script>

<style lang="scss" scoped>
#bottom {
  height: 0.84rem;
}
</style>
