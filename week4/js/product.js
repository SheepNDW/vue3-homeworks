import { createApp, ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

// 匯入元件
import pagination from './components/pagination.js'
import modalComponent from './components/modal.js'
import { bsModal } from './components/modal.js'

const app = createApp({
  components: { pagination, modalComponent },
  setup() {
    // api
    const baseURL = 'https://vue3-course-api.hexschool.io/v2'
    const path = 'sheep-api'

    // 產品列表
    const products = ref(null)

    // 取得產品資料方法
    const pagination = ref(null)
    const getProductData = async (page = 1) => {
      try {
        const { data } = await axios.get(`${baseURL}/api/${path}/admin/products?page=${page}`)
        products.value = data.products
        pagination.value = data.pagination
      }
      catch (err) {
        alert(err.data.message)
        window.location = 'login.html'
      }
    }

    // 驗證權限的方法
    const checkLogin = () => {
      axios.post(`${baseURL}/api/user/check`)
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


    // 當前選中/將要新增的產品
    let selectedProduct = ref({})
    const isEdit = ref(false)
    const openModal = (status, product = { imagesUrl: [] }) => {
      if (status === 'edit') {
        isEdit.value = true
        selectedProduct.value = { ...product }
      } else {
        isEdit.value = false
        selectedProduct.value = product
        // 預設為啟動狀態
        selectedProduct.value.is_enabled = 1
      }
      bsModal.show()
    }


    // --- 刪除產品的方法 ---
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
            const { data } = await axios.delete(`${baseURL}/api/${path}/admin/product/${id}`)
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

    // --- 登出事件 ---
    const logout = async () => {
      const { data } = await axios.post(`${baseURL}/logout`)
      Swal.fire({
        title: data.message,
        icon: 'info',
        showConfirmButton: false,
        timer: 1000
      }).then(() => window.location = 'login.html')
    }

    // 點擊 switchBox 事件
    const changeEnabled = (item) => {
      isEdit.value = true
      selectedProduct.value = item

      let api = `${baseURL}/api/${path}/admin/product/${selectedProduct.value.id}`
      axios.put(api, { data: selectedProduct.value }).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        // 重新渲染列表
        getProductData()
      })
    }

    return {
      products,
      getProductData,
      selectedProduct,
      openModal,
      removeProduct,
      logout,
      isEdit,
      changeEnabled,
      pagination,
    }
  }
})

app.mount('#app')