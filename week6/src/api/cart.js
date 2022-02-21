import request from '@/utils/request'
const path = 'sheep-api'

/**
 * 取得購物車列表
 * @returns Promise
 */
export const getCartList = () => {
  return request(`/api/${path}/cart`, 'get')
}

/**
 * 加入購物車
 * @param {String} prodcutId - 產品id
 * @param {Integer} count - 數量
 * @returns Promise
 */
export const insertCart = (prodcutId, count) => {
  return request(`/api/${path}/cart`, 'post', { data: { product_id: prodcutId, qty: count } })
}
