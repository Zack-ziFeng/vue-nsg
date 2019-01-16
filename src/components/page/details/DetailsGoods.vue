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
        <dd
          v-for="(item, idx) in defaultStyle"
          :key="idx"
          :class="item==='' ? 'none' : 'selects'"
        >{{item}}</dd>
        <dd class="right"></dd>
      </dl>
    </div>

    <div id="shop">
      <div class="top">
        <img src="../../../../static/img/shop.png">
        <h2>{{shopName}}</h2>
        <span class="right"></span>
      </div>
      <div class="bottom">
        <ul>
          <li v-for="(item, idx) in grade" :key="idx">
            <span>{{item}}</span>
            <span></span>
          </li>
        </ul>
      </div>
    </div>

    <div id="recommend">
      <h3>店铺推荐</h3>
      <ul>
        <li v-for="(item, idx) in lists" :key="idx" :id="item.goods_id" @click="jumpTab(item.goods_id)">
          <img :src="item.goods_image_url">
          <p>{{item.goods_name}}</p>
          <span>￥{{item.goods_promotion_price}}</span>
        </li>
      </ul>
    </div>

    <div id="bottom"></div>
  </div>
</template>

<script>
export default {
  props: ["goods", "Imgs", "goodsName", "goodsMsg"],
  inject: ['reload'],
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
      },
      shopName: "",
      grade: [],
      lists: ""
    };
  },
  methods: {
    jumpTab(id) {
      this.reload();
      this.$router.replace({
        path: "/details",
        query: { goodsId: id }
      });
    }
  },
  beforeUpdate() {
    console.log(this.goodsMsg);
    this.money = this.goodsMsg.goods_info.goods_price;
    this.num = this.goodsMsg.goods_info.goods_salenum;
    this.address.site = this.goodsMsg.goods_hair_info.area_name;
    this.address.have = this.goodsMsg.goods_hair_info.if_store_cn;
    this.address.freight = this.goodsMsg.goods_hair_info.content;
    this.shopName = this.goodsMsg.store_info.store_name;
    if (this.goodsMsg.goods_info.spec_value) {
      this.defaultStyle.color = Object.values(
        this.goodsMsg.goods_info.spec_value[1]
      )[0];
      this.defaultStyle.size = Object.values(
        this.goodsMsg.goods_info.spec_value[15]
      )[0];
    } else {
      this.defaultStyle.color = "";
      this.defaultStyle.size = "";
    }
    this.lists = this.goodsMsg.goods_commend_list;
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
  .selects {
    float: left;
    min-width: 0.8rem;
    text-align: center;
    border: 1px solid #888;
    line-height: 0.32rem;
    margin-right: 0.3rem;
    color: #333;
    padding: 0 0.1rem;
  }
  .none {
    border: none;
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

#shop {
  padding: 0.2rem 0;
  background-color: #f5f5f5;
  .top {
    overflow: hidden;
    background-color: #fff;
    padding: 0.15rem 0.2rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
      float: left;
    }
    h2 {
      float: left;
      font-size: 0.3rem;
      font-weight: normal;
      margin-left: 0.12rem;
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
  .bottom {
    background-color: #fff;
  }
}

#recommend {
  padding: 0.2rem;
  h3 {
    font-size: 0.1rem;
    color: #888;
    padding: 0.08rem 0;
    margin-bottom: 0.02rem;
  }
  ul {
    overflow: hidden;
    li {
      overflow: hidden;
      float: left;
      width: 1.5rem;
      margin: 0.2rem;
      margin-right: 0;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      p {
        font-size: 0.12rem;
        color: #888;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
      }
      span {
        font-size: 0.12rem;
        float: left;
      }
    }
  }
}
#bottom {
  height: 0.84rem;
}
</style>
