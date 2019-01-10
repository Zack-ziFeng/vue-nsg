<template>
  <div id="content">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item, idx) in Imgs" :key="idx">
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
    <p id="goodsName">{{goodsName}}</p>
    <div id="price">
      <div class="left">￥{{money}}</div>
      <div class="right">销量：{{num}}</div>
    </div>
    <div id="address">
      <div class="left">送至</div>
      <div class="right">
        <dl>
          <dt>
            <span class="site">{{address.site}}</span>
            <span class="have">{{address.have}}</span>
          </dt>
          <dd>{{address.freight}}</dd>
        </dl>
      </div>
    </div>
    <div id="style">
      <dl>
        <dt>已选</dt>
        <dd v-for="(item, idx) in defaultStyle" :key="idx" class="select">{{item}}</dd>
        <dd class="right"></dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods", "Imgs", "goodsName", "goodsMsg"],
  data() {
    return {
      address: {
        site: "",
        have: "",
        freight: ""
      },
      money: "",
      num: "",
      defaultStyle: {
        color: "",
        size: ""
      }
    };
  },
  beforeUpdate() {
    console.log(this.goodsMsg);
    this.money = this.goodsMsg.goods_info.goods_price;
    this.num = this.goodsMsg.goods_info.goods_salenum;
    this.address.site = this.goodsMsg.goods_hair_info.area_name;
    this.address.have = this.goodsMsg.goods_hair_info.if_store_cn;
    this.address.freight = this.goodsMsg.goods_hair_info.content;
    this.defaultStyle.color = Object.values(
      this.goodsMsg.goods_info.spec_value[1]
    )[0];
    this.defaultStyle.size = Object.values(
      this.goodsMsg.goods_info.spec_value[15]
    )[0];
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
#address {
  overflow: hidden;
  font-size: 0.25rem;
  margin-top: 0.1rem;
  padding: 0.1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3rem;
  .left {
    float: left;
    padding-left: 0.1rem;
    padding-right: 0.2rem;
    color: #888;
  }
  .right {
    float: left;
    dt {
      margin-bottom: 0.1rem;
      .site {
        padding-right: 0.2rem;
      }
      .have {
        color: #ff5001;
        font-weight: bold;
      }
    }
    dd {
      color: #888;
    }
  }
}
#style {
  overflow: hidden;
  font-size: 0.25rem;
  margin-top: 0.1rem;
  padding: 0.2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3rem;
  dt {
    color: #888;
    margin-right: 0.3rem;
    float: left;
  }
  .select {
    float: left;
    width: 0.8rem;
    text-align: center;
    border: 1px solid #888;
    line-height: 0.32rem;
    margin-right: 0.3rem;
    color: #333;
  }
  .right {
    float: right;
    width: 0.2rem;
    height: 0.2rem;
    border: 0.02rem solid #888;
    border-left-color: #fff;
    border-bottom-color: #fff;
    transform: rotateZ(45deg) translateY(0.08rem);
  }
}
</style>
