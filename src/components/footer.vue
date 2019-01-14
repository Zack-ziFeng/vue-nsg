<template>
  <mt-tabbar v-model="selected" :fixed = true v-show="show">
    <template v-for="route in $router.options.routes">
      <mt-tab-item v-if="!route.hidden"
                   :id="route.path"
                   :key="route.path"
                   @click.native="changeTab(route.path)">
        <img slot="icon"
             :src="route.path === '/' ? 'static/img/' + 'home.png' : 'static/img/' + route.path.slice(1) + '.png'">
        {{route.name}}
      </mt-tab-item>
    </template>
  </mt-tabbar>
</template>
<script>
export default {
  data () {
    return {
      selected: '/',
      show: true
    }
  },
  methods: {
    changeTab (path) {
      this.$router.push(path)
    }
  },
  components: {
  },
  watch: {
    $route (to, from) {
      let hideArr = ['/details']
      if (hideArr.indexOf(this.$route.path) >= 0) {
        console.log(1)
        this.show = false
      } else {
        this.show = true
      }
      var index = this.$route.path.slice(1).indexOf('/')
      var thispath
      if (index === -1) {
        thispath = this.$route.path
      } else {
        thispath = this.$route.path.slice(0, index + 1)
      }
      this.selected = thispath
    }
  },
  mounted () {
    // 网页刷新后重新设置导航选中
    var index = this.$route.path.slice(1).indexOf('/')
    var thispath
    if (index === -1) {
      thispath = this.$route.path
    } else {
      thispath = this.$route.path.slice(0, index + 1)
    }
    this.selected = thispath
  }
}
</script>
