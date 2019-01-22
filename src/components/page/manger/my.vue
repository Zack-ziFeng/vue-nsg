<template>
  <div>
    <mt-header fixed>
      <mt-button slot="left">
        <img src="/static/img/set.png">
      </mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div id="top">
      <div class="login" @click="jumpLogin()" v-show="!isShow">
        <img src="/static/img/my.png">
        <span>点击登录</span>
      </div>

      <div class="login" v-show="isShow">
        <img src="/static/img/my.png">
        <span>{{name}}</span>
      </div>

      <ul>
        <li v-for="(item, idx) in btns" :key="idx">
          <img :src="item.url">
          <span>{{item.val}}</span>
        </li>
      </ul>
    </div>

    <div id="bottom">
      <div class="top">
        <dl>
          <dt>全部订单</dt>
          <dd>
            <ul>
              <li v-for="(item, idx) in my_order" :key="idx">
                <img :src="item.i">
                <span>{{item.val}}</span>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="center">
        <dl>
          <dt>我的财产</dt>
          <dd>
            <ul>
              <li v-for="(item, idx) in my_money" :key="idx">
                <img :src="item.i">
                <span>{{item.val}}</span>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="bottom">
        <span>收货地址</span>
        <span>系统设置</span>
      </div>

      <mt-button type="danger" size="large" v-show="isShow" @click="out()">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btns: [
        {
          url: "/static/img/love.png",
          val: "商品收藏"
        },
        {
          url: "/static/img/shop2.png",
          val: "店铺收藏"
        },
        {
          url: "/static/img/history.png",
          val: "我的足迹"
        }
      ],
      my_order: [
        {
          i: "/static/img/my/01.png",
          val: "代付款"
        },
        {
          i: "/static/img/my/02.png",
          val: "待收货"
        },
        {
          i: "/static/img/my/03.png",
          val: "待自提"
        },
        {
          i: "/static/img/my/04.png",
          val: "待评价"
        },
        {
          i: "/static/img/my/05.png",
          val: "退款/退货"
        }
      ],
      my_money: [
        {
          i: "/static/img/my/06.png",
          val: "预存款"
        },
        {
          i: "/static/img/my/07.png",
          val: "充值卡"
        },
        {
          i: "/static/img/my/08.png",
          val: "代金券"
        },
        {
          i: "/static/img/my/09.png",
          val: "红包"
        },
        {
          i: "/static/img/my/10.png",
          val: "积分"
        }
      ],
      isShow: false,
      name: ""
    };
  },
  methods: {
    jumpLogin() {
      this.$router.replace({ path: "/login" });
    },
    out() {
      let now = new Date();
      now.setDate(now.getDate() - 1);
      document.cookie = `user=x;expires=${now}`;
      this.$router.replace({ path: "/login" });
    }
  },
  mounted() {
    if (this.$route.query.name === undefined) {
      if (document.cookie !== "") {
        let obj = JSON.parse(document.cookie.split("=")[1]);
        this.name = obj.name;
        this.isShow = true;
      } else {
        this.isShow = false;
        this.name = "";
      }
    } else {
      this.isShow = true;
      this.name = this.$route.query.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}

.mint-header {
  background-color: rgba(0, 0, 0, 0);
  img {
    width: r(25px);
  }
}
#top {
  width: 100%;
  height: r(280px);
  background: #ff5001 url("/static/img/my_bg.png") top center no-repeat;
  position: relative;

  .login {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    img {
      display: block;
      margin: 0 auto;
    }
    span {
      display: block;
      color: #fff;
      text-align: center;
      font-size: r(16px);
      margin-top: r(5px);
    }
  }

  ul {
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    width: 100%;
    li {
      float: left;
      padding: r(12px) 0;
      width: 33%;
      img {
        display: block;
        width: r(22px);
        height: r(22px);
        margin: 0 auto;
      }
      span {
        display: block;
        color: #fff;
        font-size: r(14px);
        text-align: center;
        margin-top: r(5px);
      }
    }
  }
}

#bottom {
  .top,
  .center {
    dl {
      background: #fff;
      margin: r(10px) 0;
      dt {
        width: 100%;
        padding: r(10px);
        font-size: r(16px);
        border-bottom: 1px solid #eee;
      }
      dd {
        overflow: hidden;
        width: 100%;
        ul {
          width: 100%;
          li {
            float: left;
            width: 20%;
            margin: r(10px) 0;
            img {
              display: block;
              width: r(18px);
              height: r(18px);
              margin: 0 auto;
            }
            span {
              display: block;
              font-size: r(14px);
              margin-top: r(4px);
              text-align: center;
            }
          }
        }
      }
    }
  }
  .bottom {
    span {
      display: block;
      width: 100%;
      background: #fff;
      padding: r(10px);
      border-bottom: 1px solid #eee;
      font-size: r(14px);
    }
  }
}
.mint-button--danger {
  margin-top: 0.4rem;
}
</style>
