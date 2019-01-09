<template>
  <div>
    <mt-header title>
      <mt-button icon slot="left">{{content}}</mt-button>
      <router-link to="/" slot="right">
        <mt-button icon>
          <i class="arrow-r"></i>
        </mt-button>
      </router-link>
    </mt-header>

    <div id="items">
      <ul>
        <li v-for="(item, idx) in itemsList" :key="idx" :id="item.gc_id">
          <a href>
            <img :src="item.gc_image">
            <p>{{item.gc_name}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "itemsList"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.mint-header {
  color: #999;
  background-color: #fcfcfc;
}
.arrow-r {
  display: block;
  width: 0.256rem;
  height: 0.256rem;
  background: #fcfcfc url(../../../../static/img/arrow-r.png) no-repeat 50% 50%;
  background-size: cover;
  float: right;
  margin: 0.16rem 0.16rem 0 0;
  opacity: 0.5;
}
#items ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  padding-top: 0.064rem;
}
#items ul li {
  display: inline-block;
  width: 1.8rem;
}
#items ul li a {
  text-decoration: none;
  color: #444444;
  display: block;
  margin: 0 auto;
}
#items ul li img {
  display: block;
  margin: 0 auto;
  width: 1.2rem;
  height: 1.2rem;
}
#items ul li p {
  text-align: center;
  font-size: 0.176rem;
  line-height: 0.47rem;
}
</style>


