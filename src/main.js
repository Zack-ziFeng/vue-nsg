// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui组件和css
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vuex
import Vuex from 'vuex'
import store from './vuex/store'

// 引入mint-ui组件和css
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// use
Vue.use(ElementUi)
Vue.use(Vuex)
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
