<template>
  <div class="toTop" @click="toTop"><i></i></div>
</template>
<script>
export default {
  methods: {
    toTop () {
      let timer = setInterval(() => {
        var thisTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (thisTop === 0) {
          clearInterval(timer)
        }
        let ispeed = Math.floor(-thisTop / 15)
        document.documentElement.scrollTop = document.body.scrollTop = thisTop + ispeed
      }, 16)
    }
  }
}
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px / 50px * 1rem;
}
.toTop {
  border-radius: 50%;
  border: r(1px) solid #eee;
  background: rgba(255, 255, 255, 0.85);
  i {
    display: block;
    width: r(42.89px);
    height: r(42.89px);
    background: url("https://www.nanshig.com/wap/images/gotop_b.png") no-repeat;
    background-position: 50% 50%;
    background-size: 60%;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}
</style>
