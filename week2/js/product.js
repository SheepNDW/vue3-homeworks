import { createApp, ref, reactive, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

const app = createApp({
  setup() {
    // api
    const url = 'https://vue3-course-api.hexschool.io/v2'
    const path = 'sheep-api'

    // 產品列表
    const products = ref([])

    // 取得產品資料方法
    const getProductData = async () => {
      const { data } = await axios.get(`${url}/api/${path}/admin/products`)
      products.value = data.products
      console.log(products);
    }

    // 驗證權限函式
    const checkLogin = async () => {
      const res = await axios.post(`${url}/api/user/check`)
      // 驗證失敗跳回登入頁
      if (res.status !== 200) {
        window.location = 'login.html'
      }
      // 驗證成功 取得產品資料
      getProductData()
    }

    onMounted(() => {
      // 取得 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      axios.defaults.headers.common['Authorization'] = token

      // 驗證是否為登入狀態
      checkLogin()
    })

    // 當前選中的產品
    let selectedProduct = reactive({})
    const checkDetail = id => {
      selectedProduct = products.value.find(item => item.id === id)
      console.log(selectedProduct)
    }

    return { products, selectedProduct, checkDetail }
  }
}).mount('#app')