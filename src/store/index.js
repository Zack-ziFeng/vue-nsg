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
      color: '黄',
      size: 'S',
      selected: false,
      cartId: 1
    },
    {
      goodId: '218662',
      goodName: '七分裤男士夏季百搭休闲宽松短裤韩版学生时尚破洞毛边休闲裤子潮 白色 M',
      goods_price: '89.00',
      imgUrl: 'https://www.nanshig.com/data/upload/shop/store/goods/18/18_05545569766481325_360.jpg',
      storeName: '顺兴男士潮流',
      num: '10',
      color: '黄',
      size: 'S',
      selected: false,
      cartId: 2
    },
    {
      goodId: '217366',
      goodName: '原宿风男士潮流牛仔裤韩版修身大破洞休闲七分裤个性大码裤子 白 28',
      goods_price: '88.00',
      imgUrl: 'https://www.nanshig.com/data/upload/shop/store/goods/16/16_05543798347139230_360.jpg',
      storeName: '尚潮男士专卖',
      num: '5',
      color: '黄',
      size: 'S',
      selected: false,
      cartId: 3
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
      if (item.cartId === payload.id) {
        item.num = payload.num
      }
    })
  },
  removeList (state, payload) {
    state.cartList.forEach((item, index) => {
      if (item.cartId === payload.id) {
        state.cartList.splice(index, 1)
      }
    })
  },
  pushGood (state, payload) {
    for (let i = 0; i < state.cartList.length; i++) {
      if (payload.goodId === state.cartList[i].goodId && payload.color === state.cartList[i].color && payload.size === state.cartList[i].size) {
        state.cartList[i].num = state.cartList[i].num * 1 + payload.num * 1
        return
      }
    }
    payload.cartId = state.cartList[state.cartList.length - 1].cartId + 1
    state.cartList.push(payload)
  }
}

const actions = {
  // hideFooter (context) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
  //   context.commit('hide')
  // },
  // showFooter (context) { // 同上注释
  //   context.commit('show')
  // },
  // getNewNum (context, num) { // 同上注释，num为要变化的形参
  //   context.commit('newNum', num)
  // }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
