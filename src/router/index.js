import Vue from 'vue'
import Router from 'vue-router'
/**
 * 组件引入
 */
import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Message from '@/components/Message'
import Cart from '@/components/Cart'
import My from '@/components/My'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      name2: 'home',
      component: Home
    },
    {
      path: '/classify',
      name: '分类',
      name2: 'classify',
      component: Classify
    },
    {
      path: '/message',
      name: '消息',
      name2: 'message',
      component: Message
    },
    {
      path: '/cart',
      name: '购物车',
      name2: 'cart',
      component: Cart
    },
    {
      path: '/my',
      name: '我的',
      name2: 'my',
      component: My
    }

  ]
})
