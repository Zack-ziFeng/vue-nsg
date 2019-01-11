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
               class="inputText">
      </div>
      <div slot="right"
           class="rightBtn">
        <span @click="goto('/cate')"></span>
        <mt-button icon="more"
                   class="moreBtn"></mt-button>
      </div>
    </mt-header>
    <SortBtn @sort="resetThis"></SortBtn>
  </div>
</template>
<script>
import SortBtn from '@/components/page/goodlist/SortBtn.vue'
export default {
  data () {
    return {
      keyBox: {
        act: 'goods',
        op: 'goods_list',
        keyword: '',
        page: '10',
        curpage: '1'
      }
    }
  },
  components: {
    SortBtn
  },
  methods: {
    goto (path) {
      if (path === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push(path)
      }
    },
    resetThis (obj) {
      this.keyBox = Object.assign(this.keyBox, obj)
      this.axios.get('https://www.nanshig.com/mobile/index.php', {
        params: this.keyBox
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    let thiskeyword = this.$route.query.search
    this.axios.get('https://www.nanshig.com/mobile/index.php', {
      params: {
        act: 'goods',
        op: 'goods_list',
        keyword: thiskeyword,
        page: '10',
        curpage: '1'
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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
</style>
