<template>
  <div id="messageBox">
    <!-- 顶部导航 -->
    <mt-header title="消息列表"
               class="cartHead">
      <div slot="left">
        <mt-button icon="back"
                   @click="backOne"></mt-button>
      </div>
      <mt-button icon="more"
                 slot="right"></mt-button>
    </mt-header>
    <tips :show="messList.length<=0" :data="data" @func="toIndex"/>
  </div>
</template>
<script>
import tips from './tools/Tips'
export default {
  data () {
    return {
      messList: [],
      data: {
        title: '没有找到任何相关信息',
        message: '对话后可在此找到最近联系的客服',
        buttonName: '再去逛逛',
        logoSrc: 'https://www.nanshig.com/wap/images/talk_w.png'
      }
    }
  },
  components: {
    tips
  },
  methods: {
    backOne () {
      this.$router.go(-1)
    },
    toIndex () {
      this.$router.push('/')
    }
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
</style>
