import { ref, onMounted } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'

export let bsModal = null
export default {
  template: '#templateForProductModal',
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // api
    const baseURL = 'https://vue3-course-api.hexschool.io/v2'
    const path = 'sheep-api'

    let productModal = ref(null)
    onMounted(() => {
      // 獲取modal元素
      bsModal = new bootstrap.Modal(productModal.value)
    })

    // 新增圖片 
    const addImg = () => {
      props.product.imagesUrl = []
      props.product.imagesUrl.push('')
    }
    // 關閉產品Modal
    const closeProductModal = () => {
      bsModal.hide()
    }

    // --- 修改 / 新增 產品的方法 ---
    const updateProduct = () => {
      // 新增api
      let api = `${baseURL}/api/${path}/admin/product`
      let http = 'post'
      // 修改api
      if (props.isEdit) {
        api = `${baseURL}/api/${path}/admin/product/${props.product.id}`
        http = 'put'
      }
      // 發出請求 (注意要包在"data"裡)
      axios[http](api, { data: props.product }).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        // 重新渲染列表
        emit('get-products')
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

    return { productModal, addImg, closeProductModal, updateProduct }
  }
}