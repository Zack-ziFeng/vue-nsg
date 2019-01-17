<template>
  <div id="category">
    <Cate-Head></Cate-Head>

    <mt-navbar v-model="selected" id="navTab">
      <mt-tab-item :id="idx + 1 + ''" v-for="(item, idx) in dataTab" :key="idx">{{item.gc_name}}</mt-tab-item>
    </mt-navbar>

    <Select-Piece :content="dataText" :itemsList="itemslist" @showList="showList"></Select-Piece>

    <Items-Recommend :list="recommend"></Items-Recommend>
  </div>
</template>
<script>
import SelectPiece from "@/components/page/category/SelectPiece.vue";
import ItemsRecommend from "@/components/page/category/ItemsRecommend.vue";
import CateHead from "@/components/page/category/CateHead.vue";

export default {
  data() {
    return {
      selected: "1",
      dataTab: "",
      dataText: "",
      dataId: "",
      itemslist: "",
      recommend: ""
    };
  },
  methods: {
    showList(id) {
      this.$router.push({
        path: "/goodlist",
        query: { cate: id, type: "cate" }
      });
    }
  },
  components: {
    SelectPiece,
    ItemsRecommend,
    CateHead
  },
  updated() {
    this.dataText = this.dataTab[this.selected - 1].text;
    this.dataId = this.dataTab[this.selected - 1].gc_id;
  },
  watch: {
    dataId: function(val) {
      //类型选择
      this.axios
        .get("https://www.nanshig.com/mobile/index.php", {
          params: {
            act: "goods_class",
            op: "get_child_all",
            gc_id: val
          }
        })
        .then(res => {
          this.itemslist = res.data.datas.class_list[0].child;
        })
        .catch(err => {
          console.log(err);
        });

      this.axios
        .get("https://www.nanshig.com/mobile/index.php", {
          params: {
            act: "goods",
            op: "goods_list",
            gc_id: val,
            page: "20"
          }
        })
        .then(res => {
          this.recommend = res.data.datas.goods_list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.axios
      .get("https://www.nanshig.com/mobile/index.php", {
        params: {
          act: "goods_class"
        }
      })
      .then(res => {
        this.dataTab = res.data.datas.class_list;
        this.dataId = res.data.datas.class_list[0].gc_id;
        this.dataText = res.data.datas.class_list[0].text;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#category {
  background-color: #f5f5f5;
}
#navTab {
  background-color: #f5f5f5;
  color: #999999;
}
.mint-navbar .mint-tab-item {
  padding: 0.24rem 0;
}
.mint-navbar .mint-tab-item.is-selected {
  color: #ff5001;
  border-bottom-color: #ff5001;
  margin-bottom: 0;
}
</style>
