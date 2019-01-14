<template>
  <div>
    <div id="btn">
      <div class="left">
        <div class="l_left">
          <img src="../../../../static/img/kufu.png">
          <span>客服</span>
        </div>
        <div class="l_right">
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
export default {};
</script>

<style lang="scss" scoped>
#btn {
  overflow: hidden;
  width: 100%;
  .left {
    font-size: 0.25rem;
    float: left;
    padding: 0.15rem;
    div {
      display: inline-block;
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
      width: 1rem;
    }
  }
  .right {
    font-size: 0.4rem;
    float: right;
  }
}
</style>
