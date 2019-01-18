<template>
  <div id="loca">
    <ul>
      <li v-for="(item, idx) in locas" :key="idx" @click="clickLoca(idx)">
        <span class="left">{{item.area_name}}</span>
        <span class="right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["locas", "idx"],
  methods: {
      clickLoca(idx){
          this.$emit('pushLoca', this.locas[idx], this.idx)
      }
  }
};
</script>

<style lang="scss" scoped>
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
      position: relative;
    }
    .right {
      position: absolute;
      right: 0.4rem;
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
