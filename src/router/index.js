import Vue from 'vue'
import Router from 'vue-router'

// 引入组件
import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import Regis from '@/components/regis.vue'
import Manger from '@/components/page/manger.vue'
import My from '@/components/page/manger/my.vue'
import Page404 from '@/components/404.vue'
import Cart from '@/components/page/cart.vue'
import Message from '@/components/page/message.vue'
import Category from '@/components/page/category.vue'
// 搜索
import Search from '@/components/page/search.vue'
// 商品列表
import GoodList from '@/components/page/goodlist.vue'
import Details from '@/components/page/details.vue'
import Maps from '@/components/page/map.vue'

Vue.use(Router)

const routes = [{
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
  path: '/search',
  name: 'search',
  hidden: true,
  component: Search
},
{
  path: '/goodlist',
  name: 'goodlist',
  hidden: true,
  component: GoodList
},
{
  path: '/cate',
  name: '分类',
  component: Category
},
{
  path: '/mess',
  name: '消息',
  component: Message,
  meta: {
    requireAuth: true
  }
},
{
  path: '/cart',
  name: '购物车',
  component: Cart,
  meta: {
    requireAuth: true
  }
},
{
  path: '/manger',
  name: '我的',
  redirect: '/manger/my',
  component: Manger,
  hasChild: true,
  children: [{
    path: '/manger/my',
    name: '我的信息',
    component: My
  }
  ]
},
{
  path: '/details',
  name: '详情页',
  hidden: true,
  component: Details
},
{
  path: '/map',
  name: '位置',
  hidden: true,
  component: Maps
},
{
  path: '*',
  hidden: true,
  component: Page404
}
]

let router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (document.cookie !== '') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
