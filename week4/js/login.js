import { createApp, reactive } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

createApp({
  setup() {
    // api
    const baseURL = 'https://vue3-course-api.hexschool.io/v2'

    // 登入表單
    const form = reactive({
      username: '',
      password: ''
    })

    // 登入的點擊事件
    const login = async () => {
      try {
        const { data } = await axios.post(`${baseURL}/admin/signin`, form)
        const { token, expired } = data
        // 登入成功: 記錄token 跳轉至商品頁
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
        Swal.fire({
          icon: 'success',
          title: '歡迎回來',
          showConfirmButton: false,
          timer: 1000
        }).then(() => window.location = 'index.html')
      }
      catch (err) {
        form.password = ''
        // 登入失敗
        Swal.fire({
          icon: 'error',
          title: err.response.data.message + '!',
          text: '帳號或密碼錯誤'
        })
      }
    }

    return { form, login }
  }
}).mount('#app')