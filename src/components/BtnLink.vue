<template>
  <mt-tabbar v-model="selected" router>
    <mt-tab-item :id="route.path" v-for="route in $router.options.routes" :key="route.name">
      <img slot="icon" @click="changePath(route.path)" :src="'static/images/'+route.name2+'.png'">
      {{route.name}}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: "/"
    };
  },
  methods: {
    changePath(str) {
      this.selected = str;
    }
  },
  watch: {
    selected: function(val) {
      console.log(val)
      this.$router.push(val);
    }
  }
};
</script>

<style scoped>
  * {color: #888;font-size: 0.55rem}
</style>


