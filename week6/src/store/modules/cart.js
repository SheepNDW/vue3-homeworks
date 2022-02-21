// 購物車模組

import { getCartList, insertCart } from '@/api/cart'

export default {
  namespaced: true,
  state() {
    return {
      cartData: {
        carts: [],
        final_total: 0,
        total: 0
      }
    }
  },
  mutations: {
    SET_CART(state, payload) {
      state.cartData = payload
    }
  },
  actions: {
    // 加入購物車
    addToCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        insertCart(payload.id, payload.count).then(() => {
          return getCartList()
        }).then((res) => {
          ctx.commit('SET_CART', res.data)
          resolve()
        })
      })
    },
    // 獲取購物車內容
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        getCartList().then((res) => {
          ctx.commit('SET_CART', res.data)
          resolve()
        })
      })
    }
  }
}
