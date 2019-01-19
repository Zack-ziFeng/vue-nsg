<template>
  <div class="reset" v-show="show">
      <div class="logo">
        <i ref="Tipslogo"></i>
      </div>
      <dl class="tips">
        <dt>{{data.title}}</dt>
        <dd>{{data.message}}</dd>
      </dl>
      <div class="btn">
        <a href="javascript:;" @click="func">{{data.buttonName}}</a>
      </div>
  </div>
</template>
<script>
export default {
  props: ['show', 'data'],
  mounted () {
    let logo = this.$refs.Tipslogo
    logo.style.backgroundImage = `url(${this.data.logoSrc})`
  },
  methods: {
    func () {
      this.$emit('func')
    }
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.reset {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: r(200px);
  height: r(164px);
  .logo {
    width: r(48.39px);
    height: r(48.39px);
    margin: 0 auto;
    background: #ddd;
    padding: r(8px);
    border-radius: 50%;
    i {
      display: block;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: 50% 50%;
    }
  }
  .tips {
    margin-top: r(16.5px);
    // height: r(60.5px);
    font-size: r(16px);
    dt {
      line-height: r(20px);
      margin-bottom: r(5px);
    }
    dd {
      font-size: r(11px);
      color: #999;
      line-height: r(20px);
      margin-bottom: r(11px);
    }
  }
  .btn {
      line-height: r(14px);
      a {
        height: r(24.2px);
        width: r(62.8px);
        padding: 0 r(6.6px);
        font-size: r(14px);
        color: #555;
        background: #fff;
        border: r(1px) solid #ccc;
        line-height: r(24.2px);
        display: inline-block;
      }
  }
}
</style>
