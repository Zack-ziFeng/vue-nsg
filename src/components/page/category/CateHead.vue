<template>
  <mt-header>
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button slot="right">
        <img src="../../../../static/img/search_ico.png" alt="" id="icon">
        <input type="text" id="search" @click="toSearch">
    </mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
export default {
  methods: {
    toSearch () {
      this.$router.push({path: '/search'})
    }
  }
}
</script>

<style scoped>
.mint-header {background-color: #ff5001;}
#search {
    border-radius: 0.2rem;
    margin-right: 0.4rem;
    line-height: 0.55rem;
    padding: 0.05rem;
    padding-left: 0.58rem;
    background: #dd3000;
    width: 4.8rem;
    caret-color: rgba(255, 255, 255, 0.4);
}
#icon {
    width: 0.3rem;
    height: 0.3rem;
    position: relative;
    left: 0.55rem;
    opacity: 0.5;
}
</style>
