<template>
  <div>
    <mt-header title="购物车"
               class="cartHead">
      <div slot="left">
        <mt-button icon="back"
                   @click="backOne"></mt-button>
      </div>
      <mt-button icon="more"
                 slot="right"></mt-button>
    </mt-header>
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
                :key="i.goodId">
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
                        @click="sub(index,idx,i.goodId)">-</span>
                  <input type="text"
                         readonly
                         v-model="i.num">
                  <span class="add"
                        @click="add(index,idx,i.goodId)">+</span>
                </div>
                <i class="remove"
                   @click="remove(index,idx,i.goodId)"></i>
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="total">
      <div class="check">
        <input type="checkbox" v-model="checkAll">
      </div>
      <div class="totalPrice">
        合计总金额：<em>￥</em><span>{{total}}</span>
      </div>
      <div class="sure">
        <a href="javascript:;">确认信息</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cartList: []
    }
  },
  computed: {
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
    checkAll: {
      get () {
        return this.cartList.every(item => {
          return item.selected
        })
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
    sub (index, idx, id) {
      let num = this.cartList[index].cart[idx].num
      num = --num
      if (num > 1) {
        this.$store.commit('cartListChange', {num, id})
        this.cartList[index].cart[idx].num = num
      }
    },
    add (index, idx, id) {
      let num = this.cartList[index].cart[idx].num
      num = ++num
      if (num < 100) {
        this.$store.commit('cartListChange', {num, id})
        this.cartList[index].cart[idx].num = num
      }
    },
    backOne () {
      this.$router.go(-1)
    },
    remove (index, idx, id) {
      this.$store.commit('removeList', {id})
      this.cartList[index].cart.splice(idx, 1)
      if (this.cartList[index].cart.length <= 0) { // 数组为空时删除该数组
        this.cartList.splice(index, 1)
      }
    },
    checkIt (index, idx, checked) {
      this.cartList[index].cart[idx].selected = checked
      this.cartList[index].selected = this.cartList[index].cart.every(item => {
        return item.selected
      })
      // console.log(this.cartList[index].cart[idx].selected)
    },
    checkThisAll (index, checked) {
      // console.log(checked)
      this.cartList[index].selected = checked
      this.cartList[index].cart.forEach(item => {
        item.selected = checked
      })
      // console.log(this.cartList[index].cart)
    }
  },
  mounted () {
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
    arr3.forEach(item => {
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
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
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
  height: r(44px);
  line-height: r(44px);
  background: #fff;
  display: flex;
  .check {
    width: 15%;
    line-height: r(44px);
    text-align: center;
    input {
      margin-bottom: r(6px);
    }
  }
  .totalPrice {
    line-height: r(44px);
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
      height: r(44px);
      text-align: center;
      font-size: r(18px);
      color: #fff;
    }
  }
}
</style>
