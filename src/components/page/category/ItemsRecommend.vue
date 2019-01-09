<template>
  <div>
    <h2>商品推荐</h2>
    <ul>
      <li v-for="(item, idx) in list"
          :key="idx">
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
  props: ['list']
}
</script>

<style scoped>
h2 {
  border-left: solid 0.064rem #ff5001;
  height: 0.576rem;
  margin: 0;
  padding: 0;
  padding-left: 0.08rem;
  font-size: 0.384rem;
  line-height: 0.576rem;
  font-weight: normal;
  margin: 0.288rem;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  display: inline-block;
  background-color: #fff;
  width: 3.7rem;
  overflow: hidden;
  margin: 0.04rem;
  margin-right: 0;
}
ul li a {
  display: block;
  text-decoration: none;
  color: #000;
}
ul li a img {
  width: 3.8rem;
}
ul li a h3 {
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 0.256rem;
  padding: 0.128rem;
  padding-bottom: 0.25rem;
  font-weight: normal;
  border-bottom: 0.02rem solid #eee;
}
ul li a p {
  margin: 0;
  padding: 0;
  font-size: 0.32rem;
  font-weight: bold;
  color: #ff5001;
  padding: 0.096rem 0;
}
</style>
