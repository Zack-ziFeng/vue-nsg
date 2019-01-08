<template>
  <mt-header fixed>
    <div slot="left">
      <mt-button>
        <img src="/static/img/home_logo.png"
             alt="">
      </mt-button>
      <div class="box_con">
          <span>
              <img src="/static/img/search_ico.png" alt="">
          </span>
        <input type="text">
      </div>
    </div>
    <mt-button slot="right">
      <img src="/static/img/nsg_dingdan.png"
           alt="">
    </mt-button>
  </mt-header>
</template>
<script>
import { Header } from 'mint-ui'

export default {
  components: {
    Header
  }
}
</script>
<style lang="scss" scoped>
.mint-header {
  background: #ff5001;
  font-size: 0;
    .box_con {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 4.2rem;
        height: 0.6rem;
        span {
            display: inline-block;
            height: 100%;
            width: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            vertical-align: middle;
            background: #dd3000;
            border-radius: 0.2rem 0 0 0.2rem;
            img {
                width: 0.4rem;
            }
        }
        input {
            width: 4rem;
            height: 100%;
            border-radius: 0 0.2rem 0.2rem 0;
            background: #dd3000;
            vertical-align: middle;
        }
    }
  img {
    width: 0.5rem;
  }
}
</style>
