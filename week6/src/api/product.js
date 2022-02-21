import request from '@/utils/request'
const path = 'sheep-api'

/**
 * 取得產品列表
 * @param {Number} page - 當前頁碼
 * @returns Promise
 */
export const getProducts = (page = 1) => {
  return request(`/api/${path}/products?page=${page}`, 'get')
}

/**
 * 根據id獲取產品的詳情
 * @param {String} id - 產品id
 * @returns Promise
 */
export const getProductById = (id) => {
  return request(`/api/${path}/product/${id}`, 'get')
}
