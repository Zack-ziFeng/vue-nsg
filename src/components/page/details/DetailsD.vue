<template>
  <div>
    <div v-html="goodsD.data"></div>
    <div id="bottom"></div>
  </div>
</template>

<script>
export default {
  props: ["goodsD"]
};
</script>

<style lang="scss" scoped>
#bottom {
  height: 0.84rem;
}
</style>
