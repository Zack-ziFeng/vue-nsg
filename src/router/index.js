import Vue from 'vue'
import Router from 'vue-router'

// 引入组件
import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import Regis from '@/components/regis.vue'
import Manger from '@/components/page/manger.vue'
import My from '@/components/page/manger/my.vue'
import Send from '@/components/page/manger/send.vue'
import MyHistory from '@/components/page/manger/history.vue'
import Page404 from '@/components/404.vue'
import Cart from '@/components/page/cart.vue'
import Message from '@/components/page/message.vue'
import Category from '@/components/page/category.vue'
import Details from '@/components/page/details.vue'
import Goods from '@/components/page/details/DetailsGoods.vue'
import Detail from '@/components/page/details/DetailsD.vue'
import Evaluate from '@/components/page/details/DetailsEvaluate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: Login
    },
    {
      path: '/regis',
      name: 'regis',
      hidden: true,
      component: Regis
    },
    {
      path: '/cate',
      name: '分类',
      component: Category
    },
    {
      path: '/mess',
      name: '消息',
      component: Message
    },
    {
      path: '/cart',
      name: '购物车',
      component: Cart
    },
    {
      path: '/manger',
      name: '我的',
      redirect: '/manger/my',
      component: Manger,
      hasChild: true,
      children: [
        {path: '/manger/my', name: '我的信息', component: My},
        {path: '/manger/send', name: '发货管理', component: Send},
        {path: '/manger/history', name: '发货记录', component: MyHistory}
      ]
    },
    {
      path: '/details',
      name: '详情页',
      hidden: true,
      component: Details,
      redirect: '/details/goods',
      hasChild: true,
      children: [
        {path: '/details/goods', name: '商品', component: Goods},
        {path: '/details/deta', name: '详情', component: Detail},
        {path: '/details/evaluate', name: '评论', component: Evaluate}
      ]
    },
    {
      path: '*',
      hidden: true,
      component: Page404
    }
  ]
})
