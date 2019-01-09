<template>
  <div>
    <mt-header>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <ul id="nav">
          <li
            v-for="(item, idx) in $router.options.routes[7].children"
            :key="idx"
            :class="{'active': idx === actId}"
            @click="changeTab(idx, item.path)"
          >{{item.name}}</li>
        </ul>
      </mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      actId: 0,
      nav: ["商品", "详情", "评论"]
    };
  },
  methods: {
    changeTab(idx, path) {
      this.actId = idx;
      this.$router.push(path);
    }
  },
  mounted() {
    this.$router.push("/details/goods");
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background: #ff5001;
}
.mint-swipe {
  height: 7rem;
  width: 7rem;
  margin: 0 auto;
  overflow: hidden;
}
.mint-swipe img {
  display: block;
  margin: 0 auto;
}
#content {
  padding: 0 0.2rem;
  h1 {
    font-size: 0.325rem;
    font-weight: normal;
    margin-top: 0.15rem;
  }
}

#nav {
  display: inline-block;
  overflow: hidden;
  width: 6rem;
  position: relative;
  top: 0.05rem;
  li {
    float: left;
    padding: 0 0.6rem;
    color: #000;
  }
  .active {
    color: #fff;
  }
}
</style>