<template>
  <mt-header fixed>
    <div slot="left">
      <mt-button icon="back"
                 @click="goto"></mt-button>
      <mt-button icon="search"
                 @click="goto"></mt-button>
      <input type="text">
    </div>
    <div slot="right">
      <span>111</span>
      <mt-button icon="more"></mt-button>
    </div>
  </mt-header>
</template>
<script>
export default {
  methods: {
    goto () {
      this.$router.go(-1)
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
    .mint-button-icon {
      font-size: r(18px);
    }
  }
  .searchIcon {
    display: inline-block;
    width: r(22px);
    height: r(22px);
    vertical-align: middle;
    background: url("/static/img/search_ico.png") no-repeat;
    background-size: 80%;
    background-position: 50% 50%;
  }
}
</style>
