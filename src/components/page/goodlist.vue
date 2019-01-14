<template>
  <div class="listbox">
    <mt-header fixed
               class="listTop">
      <div slot="left">
        <mt-button icon="back"
                   @click="goto(-1)"></mt-button>
        <span class="searchIcon">
          <img src="/static/img/search_ico.png"
               alt="">
        </span>
        <input type="search"
               class="inputText"
               v-model="text"
               @click="toSearch(text)">
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
           @resetAll="resetAll"></Goods>
  </div>
</template>
<script>
import SortBtn from '@/components/page/goodlist/SortBtn.vue'
import Goods from '@/components/page/goodlist/Goods.vue'
export default {
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
      hasmore: false // 数据加载开关
    }
  },
  components: {
    SortBtn,
    Goods
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
        console.log(res, 1)
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
    toSearch (text) {
      this.$router.push({ path: '/search', query: { search: text } })
    },
    resetAll () {
      this.keyBox = {
        act: 'goods',
        op: 'goods_list',
        keyword: '',
        page: '10',
        curpage: '1'
      }
      console.log(this.keyBox)
      this.$router.push({ path: '/goodlist', query: { search: this.text } })
    }
  },
  created () { // 初始化
    // console.log(this.$route.query.search)
    let thiskeyword = this.$route.query.search
    this.text = thiskeyword
    this.keyBox.keyword = thiskeyword
    this.resetThis()
  },
  mounted () { // 挂在滚动事件
    let _this = this
    window.addEventListener('scroll', () => {
      // console.log(document.documentElement.clientHeight + document.documentElement.scrollTop, document.body.offsetHeight)
      if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.body.offsetHeight) {
        if (_this.scrollKey) {
          _this.scrollKey = false
          _this.keyBox.page = _this.keyBox.page * 1 + 10
          // console.log(_this)
          this.resetThis()
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.listTop {
  height: r(43px);
  padding: 0;
  background: #ff5001;
  .mint-button {
    width: r(43px);
  }
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
    border-radius: 0 0.1rem 0.1rem 0;
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
.paD {
  padding-top: r(84px);
  padding-bottom: r(55px);
}
</style>
