import request from '@/utils/request'
const path = 'sheep-api'

// 前台 API
/**
 * 建立訂單
 * @param {Object} order - 訂單資料表單
 * @returns Promise
 */
export const createOrder = (order) => {
  return request(`/api/${path}/order`, 'post', { data: order })
}

// 後台 API
/**
 * 取得後台訂單列表
 * @param {Integer} page - 當前頁碼
 * @returns Promise
 */
export const getOrdersList = (page = 1) => {
  return request(`/api/${path}/admin/orders?page=${page}`, 'get')
}
