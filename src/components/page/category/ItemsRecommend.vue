<template>
  <div>
    <h2>商品推荐</h2>
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <a href>
          <img :src="item.goods_image_url">
          <h3>{{item.goods_name}}</h3>
          <p>￥{{item.goods_promotion_price}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["list"]
};
</script>

<style scoped>
h2 {
  border-left: solid 0.2rem #ff5001;
  height: 1.8rem;
  margin: 0;
  padding: 0;
  padding-left: 0.25rem;
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: normal;
  margin: 0.9rem;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  display: inline-block;
  background-color: #fff;
  width: 12rem;
  overflow: hidden;
  margin: 0.4rem;
  margin-right: 0;
}
ul li a {
  display: inline-block;
  text-decoration: none;
  color: #000;
}
ul li a img {
  width: 12rem;
}
ul li a h3 {
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  padding: 0.4rem;
  padding-bottom: 0.6rem;
  font-weight: normal;
  border-bottom: 1px solid #eee;
}
ul li a p {
    margin: 0;
    padding: 0;
    font-weight: bold;
    color: #ff5001;
    padding: 0.3rem 0;
}
</style>
