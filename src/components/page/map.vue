<template>
  <div>
    <mt-header title="选择地区" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div id="top"></div>
    <div id="nav">
      <ul>
        <li v-for="(item, idx) in navs" :key="idx" :class="{'active':idx === active}">{{item}}</li>
      </ul>
    </div>
    <div id="loca">
      <ul>
        <li v-for="(item, idx) in loca" :key="idx" :id="item.area_id">
          <span class="left">{{item.area_name}}</span>
          <span class="right"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: ["一级地区", "二级地区", "三级地区"],
      active: 0,
      loca: ""
    };
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
        console.log(this.loca);
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
    li {
      float: left;
      font-size: 0.25rem;
      text-align: center;
      line-height: 0.85rem;
      width: 33.3%;
      border-bottom: 0.06rem solid #ccc;
    }
    .active {
      border-bottom-color: #ff5001;
      color: #ff5001;
    }
  }
}

#loca {
  margin-top: 0.9rem;
  ul {
    li {
      background-color: #fff;
      font-size: 0.35rem;
      line-height: 0.9rem;
      border-bottom: 0.03rem solid #eee;
      padding: 0 0.4rem;
      overflow: hidden;
    }
    .right {
      float: right;
      width: 0.2rem;
      height: 0.2rem;
      border: 0.02rem solid #888;
      border-left-color: #fff;
      border-bottom-color: #fff;
      transform: translateY(0.35rem) rotateZ(45deg);
    }
  }
}
</style>
