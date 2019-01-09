<template>
  <div id="content">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item, idx) in BImg" :key="idx"><img :src="item"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      BImg: "",
      goods_name: ""
    };
  },
  mounted() {
    this.axios
      .get("https://www.nanshig.com/mobile/index.php", {
        params: {
          act: "goods",
          op: "goods_detail",
          goods_id: this.$route.query.goodsId,
          key: ""
        }
      })
      .then(res => {
        this.data = res.data.datas;
        this.BImg = this.data.goods_image.split(",");
        this.goods_name = this.data.goods_info.goods_name;
        console.log(this.data, this.BImg, this.goods_name);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
#content {
    padding: 0 0.2rem;
}
.mint-swipe {
    height: 6.5rem;
}
</style>
