<template>
  <div>
    <div id="btn">
      <div class="left">
        <div class="l_left">
          <img src="../../../../static/img/kufu.png">
          <span>客服</span>
        </div>
        <div class="l_right" @click="jumpCart()">
          <img src="../../../../static/img/cart.png">
          <span>购物车</span>
        </div>
      </div>
      <div class="right">
        <span class="nowBuy">立即购买</span>
        <span class="addCart">加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpCart() {
      this.$router.push({
        path: "/cart"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#btn {
  overflow: hidden;
  width: 100%;
  position: fixed;
  bottom: 0;
  .left {
    font-size: 0.25rem;
    float: left;
    background-color: #eff1f2;
    width: 35%;
    div {
      display: inline-block;
      padding: 0.15rem;
      border-right: 1px solid #ddd;
      img {
        width: 0.4rem;
        display: block;
        margin: 0 auto;
      }
      span {
        display: block;
        text-align: center;
      }
    }
    .l_left {
      width: 32%;
    }
    .l_right {
      width: 40%;
    }
  }
  .right {
    font-size: 0.35rem;
    float: left;
    width: 65%;
    background-color: #ff5001;
    span {
      display: inline-block;
      text-align: center;
      padding: 0.27rem 0.2rem;
      font-weight: bold;
      color: #fff;
      &:first-child {
        width: 40%;
      }
      &:last-child {
        background-color: #fb6e52;
        width: 41%;
      }
    }
  }
}
</style>
