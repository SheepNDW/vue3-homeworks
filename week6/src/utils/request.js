import axios from 'axios'

export const baseURL = 'https://vue3-course-api.hexschool.io/v2'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// res => res.data 取出data資料, 將來打api時直接拿到的就是後台資料
instance.interceptors.response.use(res => res.data, err => Promise.reject(err))

// 請求工具函式
export default (url, method, submitData) => {
  // 負責發請求: 請求地址, 請求方式, 提交的資料
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
