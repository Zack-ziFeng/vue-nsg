<template>
  <div>
    <div id="btn">
      <div class="left">
        <div class="l_left">
          <img src="/static/img/kufu.png">
          <span>客服</span>
        </div>
        <div class="l_right" @click="jumpCart()">
          <img src="/static/img/cart.png">
          <span>购物车</span>
        </div>
      </div>
      <div class="right" @click="change()">
        <span class="nowBuy">立即购买</span>
        <span class="addCart">加入购物车</span>
      </div>
    </div>

    <mt-popup v-model="popupVisible" position="bottom">
      <div id="bottom">
        <div class="goods">
          <div class="img">
            <img :src="img[active1]">
          </div>
          <div class="text">
            <p>{{name}} {{color[active1]}} {{size[active2]}}</p>
          </div>
        </div>
        <div class="style">
          <div class="color" v-show="color.length >= 1">
            <span>颜色：</span>
            <ul>
              <li
                v-for="(item, idx) in color"
                :key="idx"
                :class="{'active1':idx === active1}"
                @click="change1(idx)"
              >{{item}}</li>
            </ul>
          </div>
          <div class="size" v-show="size.length >= 1">
            <span>尺寸：</span>
            <ul>
              <li
                v-for="(item, idx) in size"
                :key="idx"
                :class="{'active2':idx === active2}"
                @click="change2(idx)"
              >{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="buynum">
          <span class="left">购买数量</span>
          <div class="right">
            <span class="sub" @click="sub()">-</span>
            <span>{{num}}</span>
            <span class="add" @click="add()">+</span>
          </div>
        </div>
        <div class="btns">
          <span>立即购买</span>
          <span>加入购物车</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  props: ["color", "size", "now", "img", "name"],
  data() {
    return {
      popupVisible: false,
      num: 1,
      active1: 0,
      active2: 0
    };
  },
  methods: {
    jumpCart() {
      this.$router.push({
        path: "/cart"
      });
    },
    change() {
      this.popupVisible = !this.popupVisible;
    },
    add() {
      this.num++;
    },
    sub() {
      if (this.num <= 1) {
        this.num = 1;
      } else {
        this.num--;
      }
    },
    change1(idx) {
      this.active1 = idx;
    },
    change2(idx) {
      this.active2 = idx;
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
      padding: 0.277rem 0.2rem;
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
.mint-popup-bottom {
  width: 100%;
  #bottom {
    .btns {
      overflow: hidden;
      span {
        float: left;
        width: 50%;
        text-align: center;
        font-size: 0.35rem;
        padding: 0.28rem 0;
        font-weight: bold;
        color: #fff;
        &:first-child {
          background-color: #ff5001;
        }
        &:last-child {
          background-color: #fb6e52;
        }
      }
    }
    .buynum {
      overflow: hidden;
      font-size: 0.3rem;
      padding: 0.2rem;
      .left {
        float: left;
        line-height: 0.6rem;
      }
      .right {
        float: right;
        overflow: hidden;
        span {
          float: left;
          width: 0.6rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          border: 1px solid #ccc;
        }
        .add {
          border-radius: 0 0.2rem 0.2rem 0;
        }
        .sub {
          border-radius: 0.2rem 0 0 0.2rem;
        }
      }
    }
    .style {
      font-size: 0.3rem;
      padding: 0.2rem;
      ul {
        overflow: hidden;
        padding: 0.18rem;
        li {
          float: left;
          font-size: 0.2rem;
          margin-right: 0.2rem;
          border: 1px solid #ccc;
          border-radius: 0.14rem;
          padding: 0.12rem;
          margin-bottom: 0.12rem;
        }
        .active1,
        .active2 {
          background-color: #ff5001;
          color: #fff;
        }
      }
    }
    .goods {
      padding: 0.2rem;
      overflow: hidden;
      .img {
        float: left;
      }
      .text {
        float: right;
        margin-top: 0.08rem;
        p {
          font-size: 0.35rem;
        }
      }
    }
  }
}
</style>
