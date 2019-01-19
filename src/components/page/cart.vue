<template>
  <div class="cartBox">
    <!-- 顶部导航 -->
    <mt-header title="购物车"
               class="cartHead">
      <div slot="left">
        <mt-button icon="back"
                   @click="backOne"></mt-button>
      </div>
      <mt-button icon="more"
                 slot="right"></mt-button>
    </mt-header>

    <!-- 购物车列表 -->
    <div class="cartList">
      <dl v-for="(item, index) in cartList"
          :key="item.storeName">
        <dt>
          <input type="checkbox"
                 :checked="item.selected"
                 @click="checkThisAll(index, !item.selected)">
          <i></i>
          <span>{{item.storeName}}</span>
        </dt>
        <dd>
          <ul class="listCon">
            <li v-for="(i,idx) in item.cart"
                :key="i.cartId">
              <div class="check">
                <input type="checkbox"
                       :checked="i.selected"
                       @click="checkIt(index,idx,!i.selected)">
              </div>
              <div class="goodImg">
                <img :src="i.imgUrl"
                     :alt="i.goodName">
              </div>
              <div class="goodMess">
                <p class="goodName">{{i.goodName}}</p>
                <p class="goodPrice">￥{{i.goods_price}}</p>
                <div class="addSub">
                  <span class="sub"
                        @click="sub(index,idx,i.cartId)">-</span>
                  <input type="text"
                         readonly
                         v-model="i.num">
                  <span class="add"
                        @click="add(index,idx,i.cartId)">+</span>
                </div>
                <i class="remove"
                   @click="remove(index,idx,i.cartId)"></i>
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>

    <!-- 购物车为空时,显示提示 -->
    <Tip :show="cartList.length <= 0"
         :data="tipsData"
         @func="toIndex" />

    <!-- 总数 -->
    <div class="total"
         v-show="cartList.length>0">
      <div class="check">
        <input type="checkbox"
               v-model="checkAll">
      </div>
      <div class="totalPrice">
        合计总金额：<em>￥</em><span>{{total}}</span>
      </div>
      <div :class="{sure: true,noGood: noGood}">
        <a href="javascript:;">确认信息</a>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import Tip from './Tips/Tips.vue'
export default {
  data () {
    return {
      cartList: [], // 列表数据,
      tipsData: {
        title: '您的购物车还是空的',
        message: '去挑一些中意的商品吧',
        buttonName: '随便逛逛',
        logoSrc: 'https://www.nanshig.com/wap/images/cart_w.png'
      }
    }
  },
  components: {
    Tip
  },
  computed: {
    noGood () {
      let bool = true
      this.cartList.forEach(item => {
        item.cart.forEach(i => {
          if (i.selected === true) {
            bool = false
          }
        })
      })
      return bool
    },
    // 总数
    total () {
      let tot = 0
      this.cartList.forEach(item => {
        item.cart.forEach(i => {
          if (i.selected === true) {
            tot += i.num * 1 * i.goods_price * 1
          }
        })
      })
      tot = tot !== 0 ? tot.toFixed(2) : '00.00'
      return tot
    },
    // 店铺全选
    checkAll: {
      get () {
        return this.cartList.every(item => {
          return item.selected
        }) && this.cartList.length > 0
      },
      set (checked) {
        this.cartList.forEach(item => {
          item.selected = checked
          item.cart.forEach(i => {
            i.selected = checked
          })
        })
      }
    }
  },
  methods: {
    // 减少数量
    sub (index, idx, id) {
      let num = this.cartList[index].cart[idx].num
      if (num > 1) {
        num = --num
        this.$store.commit('cartListChange', { num, id })
        this.cartList[index].cart[idx].num = num
      }
    },
    // 添加数量
    add (index, idx, id) {
      let num = this.cartList[index].cart[idx].num
      if (num < 100) {
        num = ++num
        this.$store.commit('cartListChange', { num, id })
        this.cartList[index].cart[idx].num = num
      }
    },
    // 返回上一页
    backOne () {
      this.$router.go(-1)
    },
    // 删除
    remove (index, idx, id) {
      MessageBox.confirm('确定要删除该商品吗?').then(action => {
        this.$store.commit('removeList', { id })
        this.cartList[index].cart.splice(idx, 1)
        if (this.cartList[index].cart.length <= 0) { // 数组为空时删除该数组
          this.cartList.splice(index, 1)
        }
      })
    },
    // 单选
    checkIt (index, idx, checked) {
      this.cartList[index].cart[idx].selected = checked
      this.cartList[index].selected = this.cartList[index].cart.every(item => {
        return item.selected
      })
      // console.log(this.cartList[index].cart[idx].selected)
    },
    // 全选
    checkThisAll (index, checked) {
      // console.log(checked)
      this.cartList[index].selected = checked
      this.cartList[index].cart.forEach(item => {
        item.selected = checked
      })
      // console.log(this.cartList[index].cart)
    },
    toIndex () {
      this.$router.push('/')
    }
  },
  mounted () {
    // 购物车数据转换成店铺列表
    let arr = this.$store.state.cartList
    let arr2 = arr.map(item => {
      return item.storeName
    })
    let arr3 = []
    arr2.forEach(element => {
      if (arr3.indexOf(element) === -1) {
        arr3.push(element)
      }
    })
    arr3.forEach((item, index) => {
      let obj = {
        storeName: item,
        cart: [],
        selected: false
      }
      arr.forEach(ele => {
        if (ele.storeName === item) {
          obj.cart.push(ele)
        }
      })
      this.cartList.push(obj)
    })

    // 判断店铺内的商品是否已全勾选上了 true店铺也购选上
    this.cartList.forEach(i => {
      i.selected = i.cart.every(good => {
        return good.selected
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}

.cartBox {
  padding-bottom: r(55px)
}

.cartHead {
  background: #ff5001;
  height: r(43px);
  font-size: r(18px);
  line-height: r(22px);
  h1 {
    height: r(22px);
  }
}
input[type="checkbox"] {
  position: relative;
  width: r(16px);
  height: r(16px);
  background-color: #f5f5f5;
  border: r(1px) solid #ccc;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  vertical-align: middle;
}
.cartList {
  dl {
    background: #fff;
    dt {
      height: r(18px);
      padding: r(12px);
      font-size: r(15px);
      line-height: r(17px);
      border-bottom: solid r(1px) #eee;
      i {
        display: inline-block;
        width: r(17px);
        height: r(19px);
        vertical-align: middle;
        background: url("https://www.nanshig.com/wap/images/store_b.png")
          no-repeat 50% 50%;
        background-size: 90%;
        opacity: 0.8;
        filter: alpha(opacity=80);
        margin: 0 r(4px);
      }
      span {
        vertical-align: middle;
      }
    }
    .listCon {
      li {
        padding: r(10px) 0;
        margin-left: r(10px);
        font-size: 0;
        > div {
          display: inline-block;
          vertical-align: middle;
        }
        .check {
          line-height: 0;
        }
        .goodImg {
          width: r(60px);
          height: r(60px);
          border: r(1px) solid #eee;
          border-radius: r(4px);
          line-height: 0;
          padding: r(4.4px);
          vertical-align: middle;
          margin-left: r(10px);
          margin-right: r(5px);
          img {
            width: r(60px);
            height: r(60px);
            border-radius: r(4px);
          }
        }
        .goodMess {
          font-size: r(14px);
          width: r(220px);
          height: r(70px);
          position: relative;
          .goodName {
            height: r(28px);
            overflow: hidden;
            line-height: r(14px);
            margin-bottom: r(20px);
          }
          .goodPrice {
            color: #db4453;
            font-weight: 600;
          }
          .addSub {
            position: absolute;
            right: r(-30px);
            bottom: r(-2px);
            font-size: 0;
            border: solid r(1px) #ccc;
            border-radius: r(4px);
            background: #fafafa;
            span {
              border-radius: r(4px) 0 0 r(4px);
              display: inline-block;
              width: r(26px);
              height: r(26px);
              vertical-align: middle;
            }
            .sub {
              background: url("https://www.nanshig.com/wap/images/value_minus.png")
                no-repeat 50% 50%;
              background-size: 40%;
            }
            .add {
              background: url("https://www.nanshig.com/wap/images/value_add.png")
                no-repeat 50% 50%;
              background-size: 40%;
            }
            input {
              width: r(28px);
              height: r(26px);
              font-size: r(14px);
              text-align: center;
              background: #fff;
              border: r(1px) solid #eee;
            }
          }
          .remove {
            position: absolute;
            top: r(0px);
            right: r(-30px);
            width: r(22px);
            height: r(22px);
            background: url("https://www.nanshig.com/wap/images/del_b.png")
              no-repeat 50% 50%;
            background-size: 70%;
          }
        }
      }
    }
  }
}
.total {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: r(55px);
  line-height: r(55px);
  background: #fff;
  display: flex;
  z-index: 10;
  .check {
    width: 15%;
    line-height: r(55px);
    text-align: center;
    input {
      margin-bottom: r(6px);
    }
  }
  .totalPrice {
    line-height: r(55px);
    font-size: r(14px);
    text-align: right;
    flex: 1;
    em {
      font-style: normal;
      color: #db4453;
    }
    span {
      font-size: r(20px);
      color: #db4453;
      font-weight: 600;
      margin-right: r(20px);
    }
  }
  .sure {
    width: r(94px);
    background: #ff5001;
    a {
      display: block;
      height: r(55px);
      text-align: center;
      font-size: r(18px);
      color: #fff;
    }
  }
  .noGood {
    background: #888
  }
}
</style>
