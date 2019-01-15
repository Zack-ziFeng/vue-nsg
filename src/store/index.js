import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  cartList: [
    {
      goodId: '223323',
      goodName: '男士短裤夏季潮流七分裤修身小脚裤子男韩版青年弹力休闲裤 藏青 28',
      goods_price: '89.00',
      imgUrl: 'https://www.nanshig.com/data/upload/shop/store/goods/15/15_05568195973129604_360.jpg',
      storeName: '顺兴男士潮流',
      num: '1',
      selected: false
    },
    {
      goodId: '218662',
      goodName: '七分裤男士夏季百搭休闲宽松短裤韩版学生时尚破洞毛边休闲裤子潮 白色 M',
      goods_price: '89.00',
      imgUrl: 'https://www.nanshig.com/data/upload/shop/store/goods/18/18_05545569766481325_360.jpg',
      storeName: '顺兴男士潮流',
      num: '10',
      selected: false
    },
    {
      goodId: '217366',
      goodName: '原宿风男士潮流牛仔裤韩版修身大破洞休闲七分裤个性大码裤子 白 28',
      goods_price: '88.00',
      imgUrl: 'https://www.nanshig.com/data/upload/shop/store/goods/16/16_05543798347139230_360.jpg',
      storeName: '尚潮男士专卖',
      num: '5',
      selected: false
    }
  ]
}

const getters = {
  cartListMess (state) {
    return state.cartList
  }
}

const mutations = {
  cartListChange (state, payload) {
    state.cartList.forEach((item, index) => {
      if (item.goodId === payload.id) {
        item.num = payload.num
        console.log(item.num, payload.num)
      }
    })
  },
  removeList (state, payload) {
    state.cartList.forEach((item, index) => {
      if (item.goodId === payload.id) {
        state.cartList.splice(index, 1)
        console.log(state.cartList)
      }
    })
  }
}

const actions = {
  hideFooter (context) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('hide')
  },
  showFooter (context) { // 同上注释
    context.commit('show')
  },
  getNewNum (context, num) { // 同上注释，num为要变化的形参
    context.commit('newNum', num)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
