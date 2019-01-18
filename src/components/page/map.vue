<template>
  <div>
    <mt-header title="选择地区" fixed>
      <mt-button icon="back" slot="left" @click="back()"></mt-button>
    </mt-header>
    <div id="top"></div>
    <div id="nav">
      <ul>
        <li v-for="(item, idx) in navs" :key="idx" :class="{'active':idx === active}">{{item}}</li>
      </ul>
    </div>
    <Tier-Loca :locas="loca" :idx="active" @pushLoca="getLoca"></Tier-Loca>
    <div id="bottom"></div>
  </div>
</template>

<script>
import TierLoca from "@/components/page/map/TierLoca.vue";

export default {
  data() {
    return {
      navs: ["一级地区", "二级地区", "三级地区"],
      active: 0,
      loca: ""
    };
  },
  components: {
    TierLoca
  },
  methods: {
    getLoca(item, idx) {
      this.navs.splice(this.active, 1, item.area_name);
      this.active = idx + 1;
      this.loca = [];
      this.axios
        .get("https://www.nanshig.com/mobile/index.php", {
          params: {
            act: "area",
            op: "area_list",
            area_id: item.area_id
          }
        })
        .then(res => {
          if (res.data.datas.area_list.length > 0) {
            this.loca = res.data.datas.area_list;
          } else {
            //this.$route.query.url
            this.$router.replace({
              path: this.$route.query.url,
              query: { loca: this.navs }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.axios
      .get("https://www.nanshig.com/mobile/index.php", {
        params: {
          act: "area",
          op: "area_list",
          area_id: 0
        }
      })
      .then(res => {
        this.loca = res.data.datas.area_list;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background-color: #ff5001;
  font-size: 0.36rem;
}

#top {
  height: 0.8rem;
}

#nav {
  ul {
    position: fixed;
    width: 100%;
    overflow: hidden;
    background: #fff;
    z-index: 9;
    li {
      float: left;
      font-size: 0.25rem;
      text-align: center;
      line-height: 0.85rem;
      width: 33.3%;
      border-bottom: 0.06rem solid #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active {
      border-bottom-color: #ff5001;
      color: #ff5001;
    }
  }
}

#bottom {
  height: 1rem;
}
</style>
