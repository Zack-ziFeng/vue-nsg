<template>
  <div class="listBox">
    <mt-header fixed>
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
    <div class="sortBtn">
      <ul class="sort">
        <li :class="{'synthesize': true,'isActive': sortActive === 'synthesize'}">
          <a href="javascript:;"
             @click="setActive('synthesize')">{{sortActiveText}}<i></i></a>
        </li>
        <li :class="{'sales': true,'isActive': sortActive === 'sales'}"
            @click="setActive('sales')">
          <a href="javascript:;">销量优先</a>
        </li>
        <li :class="{'filtrate': true,'isActive': sortActive === 'filtrate'}">
          <a href="javascript:;" @click="setActive('filtrate')">筛选<i></i></a>
        </li>
      </ul>
      <div class="changeStyle"></div>
      <ul class="syntBox"
          v-show="synthesizeKey">
        <li v-for="(item,index) in synthesizeList"
            :key="item.text"
            @click="synthesizeActive(index,item.text)">
          <a href="javascript:;" :class="{syntBoxAct:item.active}">{{item.text}}<i v-show="item.active"></i></a>
        </li>
      </ul>
    </div>
    <transition>
      <div class="filtrateBox" v-show="filtrateKey" @click="filtrateKey = false"></div>
    </transition>
  </div>

</template>
<script>
export default {
  data () {
    return {
      // 综合排序
      sortActive: 'synthesize',
      sortActiveText: '综合筛选',
      synthesizeKey: false,
      synthesizeList: [
        {
          text: '综合筛选',
          key: '',
          order: '',
          active: true
        },
        {
          text: '价格从高到低',
          key: '3',
          order: '2',
          active: false
        },
        {
          text: '价格从低到高',
          key: '3',
          order: '1',
          active: false
        },
        {
          text: '人气排序',
          key: '2',
          order: '2',
          active: false
        }
      ],
      // 筛选
      filtrateKey: false
    }
  },
  computed: {
  },
  methods: {
    goto (path) {
      if (path === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push(path)
      }
    },
    setActive (thisclass) {
      this.sortActive = thisclass
      if (thisclass === 'synthesize') {
        this.synthesizeKey = !this.synthesizeKey
      }
      if (thisclass === 'filtrate') {
        this.filtrateKey = true
        this.synthesizeKey = false
      }
    },
    synthesizeActive (index, text) {
      this.synthesizeList.forEach(item => {
        item.active = false
      })
      this.synthesizeList[index].active = true
      this.sortActiveText = text
      this.synthesizeKey = false
    }
  }
}
</script>

<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.mint-header {
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
      a{
        display: block;
        height: r(45.09px);
        line-height: r(45.09px);
        color: #777;
        padding-left: r(7.6px);
        font-size: r(15px);
        border-bottom: r(1px) solid #eee;
        position: relative;
        i{
          position: absolute;
          right: r(20px);
          top: 50%;
          transform: translateY(-50%);
          height: r(20px);
          width: r(20px);
          background: url('https://www.nanshig.com/wap/images/ok.png') no-repeat;
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
.filtrateBox {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 10;
}
</style>
