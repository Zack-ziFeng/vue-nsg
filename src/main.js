// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'

// 引入mint-ui组件和css
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// use
Vue.use(MintUI)
Vue.use(Vueaxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
