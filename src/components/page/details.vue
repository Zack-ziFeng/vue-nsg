<template>
  <div>
    <mt-header fixed=true>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <ul id="nav">
          <li
            v-for="(item, idx) in nav"
            :key="idx"
            :class="{'active': idx.toString() === actId}"
            @click="changeTab(idx)"
          >{{item}}</li>
        </ul>
      </mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <mt-tab-container v-model="actId">
      <mt-tab-container-item id="0">
        <Details-Goods :goods="data" :Imgs="Img" :goodsName="goods_name" :goodsMsg="goods_msg"></Details-Goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <Details-Detail :goodsD="goodsD"></Details-Detail>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Details-Evaluate></Details-Evaluate>
      </mt-tab-container-item>
    </mt-tab-container>

    <Details-Footer></Details-Footer>
  </div>
</template>

<script>
import DetailsGoods from "@/components/page/details/DetailsGoods.vue";
import DetailsDetail from "@/components/page/details/DetailsD.vue";
import DetailsEvaluate from "@/components/page/details/DetailsEvaluate.vue";
import DetailsFooter from "@/components/page/details/DetailsFooter.vue";

export default {
  data() {
    return {
      data: "",
      goodsId: "",
      actId: "0",
      Img: "",
      goods_name: "",
      goods_msg: "",
      nav: ["商品", "详情", "评论"],
      goodsD: ""
    };
  },
  methods: {
    changeTab(idx, path) {
      this.actId = idx.toString();
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;

    this.axios.get('https://www.nanshig.com/mobile/index.php', {params: {
      act: "goods",
      op: "goods_detail",
      goods_id: this.goodsId,
      key: ""
    }}).then(res=>{
      this.data = res.data.datas;
      this.Img = this.data.goods_image.split(',');
      this.goods_name = this.data.goods_info.goods_name;
      this.goods_msg = this.data;
    }).catch(err=>{
      console.log(err);
    });

    this.axios.get('https://www.nanshig.com/mobile/index.php', {params: {
      act: "goods",
      op: "goods_body",
      goods_id: this.goodsId,
      key: ""
    }}).then(res=>{
      this.goodsD = res;
    }).catch(err=>{
      console.log(err);
    });
  },
  components: {
    DetailsGoods,
    DetailsDetail,
    DetailsEvaluate,
    DetailsFooter
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background: #ff5001;
}
.mint-tab-container {
  margin-top: 0.8rem;
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
    transform: scale(1.4);
  }
}
</style>