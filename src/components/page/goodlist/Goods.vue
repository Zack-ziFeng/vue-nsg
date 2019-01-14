<template>
  <div>
    <ul :class="{'goodCon':type,'typeSecond':!type}"
        v-if="goodlist.length>0">
      <li v-for="good in goodlist"
          :key="good.goods_id">
        <div class="goodImg">
          <img :src="good.goods_image_url"
               :alt="good.goods_name">
        </div>
        <div class="goodMess">
          <p class="goodName">{{good.goods_name}}</p>
          <p class="goodPrice">
            ￥<span>{{good.goods_price}}</span>
          </p>
          <p class="otherParams">
            <span>销量<em>{{good.goods_salenum}}</em></span>
            <span class="store">{{good.store_name}}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="reset" v-if="goodlist.length<=0">
      <div class="logo">
        <i></i>
      </div>
      <dl class="tips">
        <dt>没有找到任何相关信息</dt>
        <dd>选择或搜索其它商品分类/名称...</dd>
      </dl>
      <div class="btn">
        <a href="javascript:;" @click="reset">重新选择</a>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: ['goodlist', 'type'],
  methods: {
    reset () {
      this.$emit('resetAll')
    }
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.reset {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: r(200px);
  height: r(164px);
  .logo {
    width: r(48.39px);
    height: r(48.39px);
    margin: 0 auto;
    background: #ddd;
    padding: r(8px);
    border-radius: 50%;
    i {
      display: block;
      height: 100%;
      background: url('https://www.nanshig.com/wap/images/search_w.png') no-repeat;
      background-size: 80%;
      background-position: 50% 50%;
    }
  }
  .tips {
    margin-top: r(16.5px);
    // height: r(60.5px);
    font-size: r(16px);
    dt {
      line-height: r(20px);
      margin-bottom: r(5px);
    }
    dd {
      font-size: r(11px);
      color: #999;
      line-height: r(20px);
      margin-bottom: r(11px);
    }
  }
  .btn {
      line-height: r(14px);
      a {
        height: r(24.2px);
        width: r(62.8px);
        padding: 0 r(6.6px);
        font-size: r(14px);
        color: #555;
        background: #fff;
        border: r(1px) solid #ccc;
        line-height: r(24.2px);
        display: inline-block;
      }
  }
}
.goodCon {
  margin-top: 0.1rem;
  // padding: 0 0.08rem;
  display: flex;
  flex-wrap: wrap;
  li {
    float: left;
    width: 49.25%;
    background: #fff;
    // margin: 0 0.08rem;
    margin-bottom: r(6px);
    // padding: 0 0.08rem;
    .goodImg {
      // height: 3.5rem;
      img {
        width: 100%;
      }
    }
    .goodName {
      font-size: r(13.5px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // line-height: 1rem;
      padding: 0 r(5px);
      padding-bottom: r(2px);
    }
    .goodPrice {
      font-size: r(12.5px);
      line-height: 0.54rem;
      color: #ec5464;
      padding: 0 r(5px);
      span {
        vertical-align: middle;
        font-size: r(18px);
      }
    }
    .otherParams {
      display: flex;
      justify-content: space-between;
      font-size: r(12px);
      padding: 0 r(5px);
      height: r(26px);
      line-height: r(26px);
      span {
        color: #888;
        em {
          font-style: normal;
          color: #000;
          margin-left: r(4px);
          font-weight: bold;
        }
      }
    }
  }
  li:nth-of-type(even) {
    margin-left: 1.5%;
  }
}
.typeSecond {
  // margin-top: r(5px);
  // padding-top: r(4px);
  li:first-child {
    margin-top: r(3px);
  }
  li {
    display: flex;
    font-size: r(14px);
    background: #fff;
    .goodImg {
      // flex:1;
      width: r(102px);
      height: r(102px);
      padding: r(7.5px);
      img {
        width: 100%;
      }
    }
    .goodMess {
      flex: 1;
      padding: r(7.6px) r(7.6px) 0 0;
      border-bottom: r(1px) solid #eee;
      .goodName {
        height: r(32px);
        line-height: r(17px);
        font-size: r(14px);
        overflow: hidden;
      }
      .goodPrice {
        padding-top: r(24px);
        font-size: r(12px);
        // line-height: 0.54rem;
        height: 0.54rem;
        color: #ec5464;
        span {
          font-size: r(18px);
        }
      }
      .otherParams {
        display: flex;
        justify-content: space-between;
        font-size: r(12px);
        span {
          color: #888;
          em {
            font-style: normal;
            color: #000;
            font-weight: bold;
            margin-left: r(4px);
          }
        }
        .store {
          margin-right: r(26px);
        }
      }
    }
  }
}
</style>
