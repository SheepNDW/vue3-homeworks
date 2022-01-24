import { createApp, ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

const app = createApp({
  setup() {
    // api
    const url = 'https://vue3-course-api.hexschool.io/v2'
    const path = 'sheep-api'

    // modal元件
    let myModal = null

    // 產品列表
    const products = ref([])

    // 取得產品資料方法
    const getProductData = async () => {
      try {
        const { data } = await axios.get(`${url}/api/${path}/admin/products`)
        products.value = data.products
      }
      catch (err) {
        alert(err.data.message)
        window.location = 'login.html'
      }
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

      // 獲取model元素
      myModal = new bootstrap.Modal(document.querySelector('#productModal'))
    })


    // 當前選中/將要新增的產品
    let selectedProduct = ref({})
    const isEdit = ref(false)
    const openModel = (status, product = {}) => {
      if (status === 'edit') {
        isEdit.value = true
        selectedProduct.value = product
      } else {
        isEdit.value = false
        selectedProduct.value = product
      }
      myModal.show()
    }
    // 新增圖片 
    const addImg = () => {
      selectedProduct.value.imagesUrl = []
      selectedProduct.value.imagesUrl.push('')
    }

    // 關閉產品Modal
    const closeProductModal = () => {
      // 清空暫存
      selectedProduct.value = {}
      // 重新渲染列表
      getProductData()
      myModal.hide()
    }

    // --- 修改 / 新增 產品的方法 ---
    const updateProduct = () => {
      // 新增api
      let api = `${url}/api/${path}/admin/product`
      let http = 'post'
      // 修改api
      if (isEdit.value) {
        api = `${url}/api/${path}/admin/product/${selectedProduct.value.id}`
        http = 'put'
      }
      // 發出請求
      axios[http](api, { data: selectedProduct.value }).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        // 關閉modal
        closeProductModal()
      }).catch(err => {
        Swal.fire({
          title: err.data.message,
          icon: 'error',
          confirmButtonText: '確定',
        })
      })
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

    // --- 登出事件 ---
    const logout = async () => {
      const { data } = await axios.post(`${url}/logout`)
      Swal.fire({
        title: data.message,
        icon: 'info',
        showConfirmButton: false,
        timer: 1000
      }).then(() => window.location = 'login.html')
    }


    return {
      products,
      selectedProduct,
      openModel,
      removeProduct,
      closeProductModal,
      logout,
      isEdit,
      addImg,
      updateProduct
    }
  }
}).mount('#app')