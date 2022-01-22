import { createApp, reactive } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

const app = createApp({
  setup() {
    // api
    const url = 'https://vue3-course-api.hexschool.io'
    // const path = 'sheep-api'

    // 登入表單
    const form = reactive({
      username: '',
      password: ''
    })

    // 登入的點擊事件
    const login = async () => {
      try {
        // 發送api至遠端取得token
        const { data } = await axios.post(`${url}/v2/admin/signin`, form)
        // 登入成功: 紀錄token 跳轉至商品頁
        const { token, expired } = data
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
        Swal.fire({
          icon: 'success',
          title: '歡迎回來',
          showConfirmButton: false,
          timer: 1000
        }).then(() => window.location = 'goodsAdminPage.html')
      }
      catch (error) {
        form.password = ''
        // 登入失敗
        Swal.fire({
          icon: 'error',
          title: error.response.data.message + '!',
          text: '帳號或密碼錯誤'
        })
      }
    }

    return { form, login }
  }
}).mount('#app')