<template>
  <div class="box">
    <headerLy></headerLy>
    <mt-swipe :show-indicators="false"
              :speed="800">
      <mt-swipe-item v-for="(item) in carousel"
                     :key="item.data">
        <img v-lazy="item.image"
             :alt="item.data">
      </mt-swipe-item>
    </mt-swipe>
    <div class="goodlist" v-for="item in goodlist" :key="item.goods.title">
      <div class="goodTitle">
        <span class="titleName">{{item.goods.title}}</span>
      </div>
      <ul class="goodCon">
        <li v-for="good in item.goods.item" :key="good.goods_id" @click="showGood(good.goods_id)">
          <div class="goodImg">
            <img v-lazy="good.goods_image"
                 :alt="good.goods_name">
          </div>
          <p class="goodName">{{good.goods_name}}</p>
          <p class="goodPrice">
            ￥<span>{{good.goods_price}}</span>
          </p>
        </li>
      </ul>
    </div>
    <to-top class="fixedTop"
            v-show="toTopShow" />
  </div>
</template>
<script>
import headerLy from '@/components/header.vue'
import ToTop from '@/components/page/tools/ToTop.vue'
export default {
  data () {
    return {
      carousel: [],
      goodlist: [],
      toTopShow: false
    }
  },
  components: {
    headerLy,
    ToTop
  },
  methods: {
    showGood (id) {
      this.$router.push({path: '/details', query: {goodsId: id}})
    },
    runLoad () {
      var thisTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var clientH = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
      // 滚动到可视区域的一半显示滚动到顶部按钮
      if (thisTop >= clientH) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    }
  },
  beforeMount () {
    this.axios.get('https://www.nanshig.com/mobile/index.php', {
      params: {
        act: 'index'
      }
    }).then(res => {
      this.carousel = res.data.datas[0].adv_list.item
      this.goodlist = res.data.datas.filter((item, index) => {
        return index !== 0
      })
    }).catch(err => {
      return err
    })
  },
  mounted () { // 挂在滚动事件
    // let _this = this
    window.addEventListener('scroll', this.runLoad)
    window.addEventListener('touchmove', this.runLoad)
  },
  destroyed () {
    window.removeEventListener('scroll', this.runLoad)
    window.removeEventListener('touchmove', this.runLoad)
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.fixedTop {
  position: fixed;
  bottom: r(80px);
  right: r(10px);
}
.box {
  background: #fafafa;
  padding-bottom: 1.1rem;
}
.mint-swipe {
  height: 2.8rem;
  padding-top: 0.82rem;
}
.mint-swipe-items-wrap {
  img {
    height: 2.8rem;
  }
}
.goodlist {
  .goodTitle {
    padding: 0.2rem 0 0.2rem 0.14rem;
    font-size: 0.32rem;
    color: #ff5001;
    .titleName {
      padding-left: 0.1rem;
      border-left: 0.06rem solid #ff5001;
    }
  }
  .goodCon {
    margin-top: 0.1rem;
    // padding: 0 0.08rem;
    display: flex;
    flex-wrap: wrap;
    li {
      float: left;
      width: 3.58rem;
      background: #fff;
      margin: 0 0.08rem;
      margin-bottom: 0.24rem;
      // padding: 0 0.08rem;
      .goodImg {
        height: 3.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodName {
        font-size: 0.28rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // line-height: 1rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.04rem solid #eeeeee;
      }
      .goodPrice {
        font-size: 0.28rem;
        line-height: 0.54rem;
        color: #ff5001;
        span {
          font-size: 0.32rem;
        }
      }
    }
  }
}
</style>
