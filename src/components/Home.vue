<template>
  <div class="box">
    <headerLy></headerLy>
    <mt-swipe :show-indicators="false"
              :speed="800">
      <mt-swipe-item v-for="(item) in carousel"
                     :key="item.data">
        <img :src="item.image"
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
            <img :src="good.goods_image"
                 :alt="good.goods_name">
          </div>
          <p class="goodName">{{good.goods_name}}</p>
          <p class="goodPrice">
            ￥<span>{{good.goods_price}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerLy from '@/components/header.vue'
export default {
  data () {
    return {
      carousel: [],
      goodlist: []
    }
  },
  components: {
    headerLy
  },
  methods: {
    showGood (id) {
      this.$router.push({path: '/details', query: {goodsId: id}})
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
      console.log(err)
    })
  }
}
</script>
<style lang="scss" scoped>
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
