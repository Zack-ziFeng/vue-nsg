<template>
  <div class="btnBox">
    <!-- 按钮 -->
    <div class="sortBtn">
      <ul class="sort">
        <li :class="{'synthesize': true,'isActive': sortActive === 'synthesize'}">
          <a href="javascript:;"
             @click="setActive('synthesize')">{{sortActiveText}}<i></i></a>
        </li>
        <li :class="{'sales': true,'isActive': sortActive === 'sales'}"
            @click="change('sales')">
          <a href="javascript:;"
             @click="setActive('sales')">销量优先</a>
        </li>
        <li :class="{'filtrate': true,'isActive': sortActive === 'filtrate'}">
          <a href="javascript:;"
             @click="setActive('filtrate')">筛选<i></i></a>
        </li>
      </ul>
      <div class="changeStyle" @click="changeClass"></div>
      <ul class="syntBox"
          v-show="synthesizeKey">
        <li v-for="(item,index) in synthesizeList"
            :key="item.text"
            @click="synthesizeActive(index,item.text)">
          <a href="javascript:;"
             :class="{syntBoxAct:item.active}"
             @click="change('synthesize',index)">{{item.text}}<i v-show="item.active"></i></a>
        </li>
      </ul>
    </div>
    <!-- 弹框 -->
    <transition name="more">
      <div class="filtrateBox"
           v-show="filtrateKey">
        <mt-header title="商品筛选">
          <mt-button icon="back"
                     slot="left"
                     @click="back"></mt-button>
        </mt-header>
        <div class="filtrateItem">
          <dl class="item">
            <dt>价格区间</dt>
            <dd class="price">
              <input type="number"
                     placeholder="最低价"
                     v-model="filtrate[0].minimum"><span></span><input type="number"
                     placeholder="最高价"
                     v-model="filtrate[0].highest">
            </dd>
          </dl>
          <dl class="item">
            <dt>商品所在地</dt>
            <dd class="addr">
              <div>
                <select v-model="filtrate[0].addrVal">
                  <option value="">不限</option>
                  <option :value="item.area_id"
                          v-for="item in filtrate[0].address"
                          :key="item.area_id">{{item.area_name}}</option>
                </select>
                <i></i>
              </div>
            </dd>
          </dl>
          <dl class="item">
            <dt>商品类型</dt>
            <dd class="type">
              <input type="button"
                     @click="checkItem(index,0)"
                     :value="item.text"
                     v-for="(item,index) in filtrate[0].goodType"
                     :key="item.text"
                     :class="{'itemActive':item.key}">
            </dd>
          </dl>
          <dl class="item">
            <dt>店铺类型</dt>
            <dd class="type">
              <input type="button"
                     :value="item.text"
                     v-for="(item,index) in filtrate[0].storeType"
                     :key="item.text"
                     @click="checkItem
                     (index,1)"
                     :class="{'itemActive':item.key}">
            </dd>
          </dl>
          <div class="submit">
            <input type="button"
                   value="筛选商品"
                   @click='submit'>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 综合排序
      sortActive: 'synthesize',
      sortActiveText: '综合排序',
      synthesizeKey: false,
      synthesizeList: [
        {
          text: '综合排序',
          key: '',
          order: '',
          active: true,
          type: 'synthesize'
        },
        {
          text: '价格从高到低',
          key: '3',
          order: '2',
          active: false,
          type: 'desc'
        },
        {
          text: '价格从低到高',
          key: '3',
          order: '1',
          active: false,
          type: 'asc'
        },
        {
          text: '人气排序',
          key: '2',
          order: '2',
          active: false,
          type: 'heat'
        }
      ],
      req: {},
      // 筛选
      filtrateKey: false,
      filtrate: [{
        minimum: '',
        highest: '',
        goodType: [
          {
            text: '赠品',
            key: false,
            type: 'gift'
          },
          {
            text: '团购',
            key: false,
            type: 'groupbuy'
          },
          {
            text: '限时折扣',
            key: false,
            type: 'xianshi'
          },
          {
            text: '虚拟',
            key: false,
            type: 'virtual'
          }
        ],
        storeType: [
          {
            text: '商家自营',
            key: false,
            type: 'own_shop'
          }
        ],
        address: [],
        addrVal: ''
      }
      ]
    }
  },
  methods: {
    setActive (thisclass) { // 排序选择 颜色高亮
      this.sortActive = thisclass
      if (thisclass === 'synthesize') {
        this.synthesizeKey = !this.synthesizeKey
      }
      if (thisclass === 'filtrate') {
        this.filtrateKey = true
        this.synthesizeKey = false
      }
    },
    synthesizeActive (index, text) { // 综合筛选选择 颜色高亮
      this.synthesizeList.forEach(item => {
        item.active = false
      })
      this.synthesizeList[index].active = true
      this.sortActiveText = text
      this.synthesizeKey = false
    },
    checkItem (index, num) { // 商家商品类型选中
      if (num === 0) {
        this.filtrate[0].goodType[index].key = !this.filtrate[0].goodType[index].key
      } else {
        this.filtrate[0].storeType[index].key = !this.filtrate[0].storeType[index].key
      }
    },
    clearItem () { // 清零
      this.filtrate[0].minimum = ''
      this.filtrate[0].highest = ''
      this.filtrate[0].goodType.forEach(item => {
        item.key = false
      })
      this.filtrate[0].storeType.forEach(item => {
        item.key = false
      })
    },
    back () { // 返回
      // this.clearItem()
      this.filtrateKey = false
    },
    submit () {
      if (this.filtrate[0].minimum) {
        this.req['price_from'] = this.filtrate[0].minimum
      } else {
        this.req.price_from = ''
      }
      if (this.filtrate[0].highest) {
        this.req['price_to'] = this.filtrate[0].highest
      } else {
        this.req.price_to = ''
      }
      this.filtrate[0].goodType.forEach(item => {
        if (item.key) {
          this.req[item.type] = '1'
        } else {
          this.req[item.type] = ''
        }
      })
      this.filtrate[0].storeType.forEach(item => {
        if (item.key) {
          this.req[item.type] = '1'
        } else {
          this.req[item.type] = ''
        }
      })
      if (this.filtrate[0].addrVal) {
        this.req.area_id = this.filtrate[0].addrVal
      } else {
        this.req.area_id = ''
      }
      this.filtrateKey = false
      this.$emit('sort', this.req)
    },
    change (type, index) {
      switch (type) {
        case 'sales':
          this.req.key = '1'
          this.req.order = '2'
          break
        case 'synthesize':
          this.req.key = this.synthesizeList[index].key
          this.req.order = this.synthesizeList[index].order
          break
      }
      this.$emit('sort', this.req)
    },
    changeClass () {
      this.$emit('changeClass')
    }
  },
  created () {
    this.axios.get('https://www.nanshig.com/mobile/index.php', {
      params: {
        act: 'index',
        op: 'search_adv'
      }
    }).then(res => {
      this.filtrate[0].address = res.data.datas.area_list
      // console.log(this.address)
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
// 排序按钮
.sortBtn {
  width: 100%;
  height: r(43px);
  position: fixed;
  top: r(43px);
  left: 0;
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  font-size: 0.28rem;
  border-bottom: r(1px) solid #eee;
  .syntBox {
    position: absolute;
    background: #fff;
    width: 100%;
    top: r(44px);
    left: 0;
    padding-left: r(7.6px);
    li {
      a {
        display: block;
        height: r(45.09px);
        line-height: r(45.09px);
        color: #777;
        padding-left: r(7.6px);
        font-size: r(15px);
        border-bottom: r(1px) solid #eee;
        position: relative;
        i {
          position: absolute;
          right: r(20px);
          top: 50%;
          transform: translateY(-50%);
          height: r(20px);
          width: r(20px);
          background: url("https://www.nanshig.com/wap/images/ok.png") no-repeat;
          background-position: 50% 50%;
          background-size: 80%;
        }
      }
    }
    .syntBoxAct {
      color: #ff5001;
    }
  }
  .sort {
    flex: 1;
    display: flex;
    border-right: r(1px) solid #eee;
    line-height: r(43px);
    > li {
      width: 30%;
      text-align: center;
      > a {
        color: #888;
        i {
          display: inline-block;
          vertical-align: middle;
          border-width: 0.08rem;
          border-style: solid;
          border-color: #aaa transparent transparent transparent;
          margin-left: r(5px);
        }
      }
    }
    .isActive {
      a {
        color: #ff5001;
        i {
          border-color: #dd3000 transparent transparent transparent;
        }
      }
    }
    .synthesize {
      width: 40%;
    }
  }
  .changeStyle {
    width: 14.5%;
    background: url("https://www.nanshig.com/wap/images/browse_list.png")
      no-repeat;
    background-position: 50% 50%;
    background-size: 40%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}
// 筛选页面
.filtrateBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
  z-index: 10;
  right: 0;
  // 头部
  .mint-header {
    background: #ff5001;
    height: r(43px);
    font-size: r(18px);
  }
  // 选项
  .filtrateItem {
    background: #fff;
    .item {
      border-bottom: r(1px) solid #eee;
      padding: 0 r(10px);
      dt {
        font-size: r(13px);
        color: #888;
        padding-top: r(10px);
      }
      dd {
        padding-top: r(10px);
        padding-bottom: r(12px);
        line-height: r(14px);
      }
      .price {
        input {
          font-size: r(13px);
          padding: r(8px) r(12px);
          background: #f5f5f5;
          width: r(60px);
          text-align: center;
          border-radius: r(5px);
          border: r(1px) solid #eee;
        }
        span {
          display: inline-block;
          background: url("https://www.nanshig.com/wap/images/value_minus.png")
            no-repeat;
          background-position: 50% 50%;
          width: r(16px);
          height: r(18px);
          margin: 0 r(4px);
          opacity: 0.5;
          vertical-align: middle;
        }
      }
      .addr {
        div {
          display: inline-block;
          padding: r(8px) r(12px);
          padding-right: r(30px);
          background: #f5f5f5;
          color: #888;
          border-radius: r(5px);
          position: relative;
          select {
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            border: 0 none;
            background: transparent;
            font-size: r(12px);
            line-height: r(18px);
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-tap-highlight-color: transparent;
            option {
              font-size: r(12px);
            }
          }
          i {
            position: absolute;
            right: r(4px);
            top: 50%;
            transform: translateY(-50%);
            background: url("https://www.nanshig.com/wap/images/location_b.png")
              no-repeat;
            width: r(16px);
            height: r(18px);
            background-position: 50% 50%;
            background-size: 90%;
          }
        }
      }
      .type {
        input {
          color: #888;
          padding: r(8px) r(12px);
          border-radius: r(5px);
          font-size: r(12px);
          background: none;
          border: r(1px) solid #eee;
          margin-right: r(8px);
        }
        .itemActive {
          background: #ff5001;
          color: #fff;
        }
      }
    }
    // 提交
    .submit {
      padding: r(20px) 0;
      text-align: center;
      input {
        width: 80%;
        background: #ff5001;
        color: #fff;
        height: r(39px);
        border-radius: r(5px);
        font-size: r(16px);
      }
    }
  }
}
.more-enter-active,
.more-leave-active {
  transition: all 0.8s;
}
.more-enter,
.more-leave-to {
  transform: translateX(100%);
}
.more-enter-to,
.more-leave {
  transform: translateX(0);
}
</style>
