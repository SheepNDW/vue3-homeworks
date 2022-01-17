import { createApp, ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

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
    }

    // 驗證權限的方法
    const checkLogin = () => {
      axios.post(`${url}/api/user/check`)
        .then(() => {
          getProductData()
        })
        .catch((err) => {
          console.log(err)
          alert('請先登入! ')
          window.location = 'login.html'
        })
    }

    onMounted(() => {
      // 取得 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      axios.defaults.headers.common['Authorization'] = token

      // 驗證是否為登入狀態
      checkLogin()
    })

    // 當前選中的產品
    let selectedProduct = ref({})
    const checkDetail = (id) => {
      selectedProduct.value = products.value.find(item => item.id === id)
    }

    // 刪除產品的方法
    const removeProduct = (id) => {
      Swal.fire({
        title: '確定要刪除該產品嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await axios.delete(`${url}/api/${path}/admin/product/${id}`)
            Swal.fire({
              icon: 'success',
              title: data.message,
            })
            // 成功刪除後重新取得產品列表
            getProductData()
          }
          catch (err) {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
            })
          }
        } else {
          Swal.fire('已取消刪除操作', '', 'info')
        }
      })
    }

    return { products, selectedProduct, checkDetail, removeProduct }
  }
}).mount('#app')