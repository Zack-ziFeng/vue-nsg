<template>
  <div id="DetailsImg">
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
  },
  updated () {
    let imgArr = document.querySelectorAll('#DetailsImg img');
    imgArr.forEach(item => {
      item.style.width = '7.1rem';
      item.style.margin = "0 auto";
      item.style.display = "block";
    });
  }
};
</script>

<style lang="scss" scoped>
#bottom {
  height: 1.2rem;
}
</style>
