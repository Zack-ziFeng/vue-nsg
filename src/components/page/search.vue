<template>
  <div class="search">
    <mt-header :fixed="true">
      <div slot="left">
        <router-link to="/">
          <mt-button icon="back"></mt-button>
        </router-link>
        <div class="box_con">
          <span class="search_icon">
            <img src="/static/img/search_ico.png"
                 alt="">
          </span>
          <input type="text"
                 v-model="inputText">
          <span class="input_del"
                v-show="delShow"
                @click="delText"></span>
        </div>
      </div>
      <mt-button slot="right" @click="goto">搜索</mt-button>
    </mt-header>
    <div class="hotSearch">
      <h3>热门搜索</h3>
      <ul class="hotItem">
        <li v-for="(item,index) in hotList"
            :key="index">
          <a href="javascript:;">{{item}}</a>
        </li>
      </ul>
      <h3>历史记录</h3>
      <ul class="hisItem">
        <li>
          <a href="javascript:;">鞋</a>
        </li>
        <li>
          <a href="javascript:;">外套</a>
        </li>
      </ul>
    </div>
    <div class="clearHis">
      <button>清空历史</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputText: '',
      hotList: []
    }
  },
  computed: {
    delShow () {
      return this.inputText.length !== 0
    }
  },
  methods: {
    delText () {
      this.inputText = ''
    },
    goto () {
      this.$router.push({path: '/goodlist', query: {search: this.inputText}})
    }
  },
  mounted () {
    this.axios.get('https://www.nanshig.com/mobile/index.php', {
      params: {
        act: 'index',
        op: 'search_key_list'
      }
    }).then(res => {
      this.hotList = res.data.datas.list
    })
  }
}
</script>
<style lang="scss" scoped>
.mint-header {
  background: #ff5001;
  height: 0.88rem;
  font-size: 0.32rem;
  .mint-header-button {
    flex: 0.2;
  }
  .mint-button {
    color: #fff;
  }
  .box_con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 0.6rem;
    font-size: 0;
    background: #dd3000;
    border-radius: 0.2rem;
    .search_icon {
      display: inline-block;
      height: 100%;
      width: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      vertical-align: middle;
      background: #dd3000;
      border-radius: 0.2rem 0 0 0.2rem;
      img {
        width: 0.25rem;
      }
    }
    input {
      width: 3.6rem;
      height: 100%;
      vertical-align: middle;
      font-size: 0.32rem;
      color: #fff;
      margin-left: -0.02rem;
      background: none;
    }
    .input_del {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      background: url("/static/img/cancel_b.png") no-repeat;
      background-size: 50%;
      background-position: 50% 50%;
      vertical-align: middle;
      border-radius: 0 0.2rem 0.2rem 0;
    }
  }
}
.hotSearch {
  padding: 0.88rem 0.2rem 0 0.2rem;
  font-size: 0.28rem;
  h3 {
    font-size: 0.32rem;
    font-weight: normal;
    padding: 0.32rem 0 0.16rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0.08rem;
      a {
        color: #000;
        display: block;
        padding: 0.08rem 0.2rem;
        background: #fff;
      }
    }
  }
  .hotItem {
    a {
      border-radius: 0.3rem;
    }
  }
}
.clearHis {
  padding-top: 0.6rem;
  button {
    display: block;
    height: 0.774rem;
    width: 70%;
    margin: 0 auto;
    background: #EEE;
    color:#555;
    font-size: 0.32rem;
  }
}
</style>
