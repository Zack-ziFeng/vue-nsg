<template>
  <div id="content">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item, idx) in Imgs" :key="idx"><img :src="item"></mt-swipe-item>
    </mt-swipe>
    <p id="goodsName">{{goodsName}}</p>
    <div id="price">
      <div class="left">￥{{goodsMsg.goods_price}}</div>
      <div class="right">销量：{{goodsMsg.goods_salenum}}</div>
    </div>
    <div id="address">
      <div class="left">
        送至
      </div>
      <dv class="right"></dv>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods", "Imgs", "goodsName", "goodsMsg"],
  data() {
    return {
      
    };
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
#content {
  padding: 0 0.05rem;
  background-color: #fff;
}
.mint-swipe {
  height: 7rem;
  margin: 0 auto;
  overflow: hidden;
}
.mint-swipe img {
  width: 7.5rem;
  display: block;
  margin: 0 auto;
}
#goodsName {
  font-size: 0.35rem;
  padding: 0.1rem;
  margin-top: 0.1rem;
}
#price {
  overflow: hidden;
  margin-bottom: 0.08rem;
  .left {
    float: left;
    font-size: 0.4rem;
    color: #ff5001;
  }
  .right {
    float: right;
    font-size: 0.1rem;
    padding-top: 0.2rem;
    padding-right: 0.15rem;
    color: #000;
  }
}
</style>
