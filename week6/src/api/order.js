import request from '@/utils/request'
const path = 'sheep-api'

/**
 * 建立訂單
 * @param {Object} order - 訂單資料表單
 * @returns Promise
 */
export const createOrder = (order) => {
  return request(`/api/${path}/order`, 'post', { data: order })
}
