<template>
  <div class="listbox">
    <mt-header fixed
               class="listTop">
      <div slot="left">
        <mt-button icon="back"
                   @click="goto(-1)"></mt-button>
        <div class="search_box">
          <span class="searchIcon">
            <img src="/static/img/search_ico.png"
                 alt="">
          </span>
          <input type="search"
                 class="inputText"
                 v-model="text"
                 @click="toSearch(text)">
        </div>
      </div>
      <div slot="right"
           class="rightBtn">
        <span @click="goto('/cate')"></span>
        <mt-button icon="more"
                   class="moreBtn"></mt-button>
      </div>
    </mt-header>
    <SortBtn @sort="resetThis"
             @changeClass="change"></SortBtn>
    <Goods :goodlist="goodlist"
           class="paD"
           :type="changeClass"
           @resetAll="resetAll"
           @showGood="showGood"></Goods>
    <to-top class="fixedTop"
            v-show="toTopShow" />
  </div>
</template>
<script>
import SortBtn from '@/components/page/goodlist/SortBtn.vue'
import Goods from '@/components/page/goodlist/Goods.vue'
import ToTop from '@/components/page/tools/ToTop.vue'
export default {
  inject: ['reload'],
  data () {
    return {
      // 请求参数
      keyBox: {
        act: 'goods',
        op: 'goods_list',
        keyword: '',
        page: '10',
        curpage: '1'
      },
      // 商品数据
      goodlist: [],
      changeClass: false, // 样式开关
      text: '', // 搜索框内容
      scrollKey: true, // 滚动加载开关
      hasmore: false, // 数据加载开关,
      toTopShow: false // 滚动到顶部开关
    }
  },
  components: {
    SortBtn,
    Goods,
    ToTop
  },
  methods: {
    goto (path) { // 路由跳转
      if (path === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push(path)
      }
    },
    resetThis (obj) { // 请求
      if (obj === 'all') {
        this.keyBox = {
          act: 'goods',
          op: 'goods_list',
          keyword: '',
          page: '10',
          curpage: '1'
        }
      } else {
        this.keyBox = Object.assign(this.keyBox, obj)
      }
      for (var i in this.keyBox) {
        if (this.keyBox[i] === '') {
          delete this.keyBox[i]
        }
      }
      this.axios.get('https://www.nanshig.com/mobile/index.php', {
        params: this.keyBox
      }).then(res => {
        this.hasmore = res.data.hasmore // 是否还有更多
        if (this.hasmore) {
          this.scrollKey = true
        } else {
          this.scrollKey = false
        }
        this.goodlist = res.data.datas.goods_list
      }).catch(err => {
        console.log(err)
      })
    },
    change () { // 切换列表样式
      this.changeClass = !this.changeClass
    },
    // 返回搜索页面
    toSearch (text) {
      this.$router.push({ path: '/search', query: { search: text } })
    },
    resetAll () {
      this.reload()
      if (this.$route.query.type === 'cate') {
        this.$router.push({ path: '/goodlist', query: { cate: this.keyBox.gc_id, type: 'cate' } })
      } else {
        this.$router.push({ path: '/goodlist', query: { search: this.text, type: 'search' } })
      }
    },
    // 滚动加载
    runLoad () {
      // if (this.$route.path !== '/goodlist') return
      var thisTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var clientH = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
      // 滚动到可视区域的一半显示滚动到顶部按钮
      if (thisTop >= clientH) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
      var bdh = document.body.offsetHeight || document.documentElement.offsetHeight
      // console.log(thisTop, clientH, bdh)
      // 滚动加载
      if (clientH + thisTop >= bdh) {
        if (this.scrollKey) {
          this.scrollKey = false
          this.keyBox.page = this.keyBox.page * 1 + 10
          // console.log(_this)
          this.resetThis()
        }
      }
    },
    // 跳转商品详情页面
    showGood (id) {
      this.$router.push({ path: '/details', query: { goodsId: id } })
    }
  },
  created () { // 初始化
    // console.log(this.$route.query.search)
    let type = this.$route.query.type
    if (type === 'search') {
      let thiskeyword = this.$route.query.search
      this.text = thiskeyword
      this.keyBox.keyword = thiskeyword
    } else {
      let thisCate = this.$route.query.cate
      delete this.keyBox['keyword']
      this.keyBox.gc_id = thisCate
    }
    this.resetThis()
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
// 顶部搜索框
.listTop {
  height: r(43px);
  padding: 0;
  background: #ff5001;
  .mint-button {
    width: r(43px);
  }
  .search_box {
    background: #dd3000;
    border-radius: 0.2rem;
    display: inline-block;
    .searchIcon {
      display: inline-block;
      background: #dd3000;
      width: r(30px);
      height: r(30px);
      border-radius: 0.1rem 0 0 0.1rem;
      vertical-align: middle;
      line-height: r(30px);
      text-align: center;
      img {
        width: 0.25rem;
        height: 0.25rem;
      }
    }
    .inputText {
      height: r(30px);
      background: #dd3000;
      width: r(210px);
      margin-left: r(-5px);
      color: #fff;
      font-size: r(14px);
      border-radius: 0.2rem;
    }
  }
  .rightBtn {
    span {
      display: inline-block;
      height: r(43px);
      width: r(30px);
      background: url("/static/img/stiore_categroy_b.png") no-repeat;
      background-size: 100%;
      vertical-align: middle;
      background-position: 50% 50%;
    }
    .moreBtn {
      width: r(38.47px);
    }
  }
}
// 筛选框定位
.paD {
  padding-top: r(84px);
  padding-bottom: r(55px);
}
.fixedTop {
  position: fixed;
  bottom: r(80px);
  right: r(10px);
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
