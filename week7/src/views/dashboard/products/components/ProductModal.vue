<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isEdit">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <h3 class="mb-3">多圖新增</h3>
              <!-- 檢查是否存在imagesUrl屬性且為陣列 -->
              <div v-if="Array.isArray(product.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(img, i) in product.imagesUrl"
                  :key="i"
                >
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label"
                      >輸入圖片網址</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="product.imagesUrl[i]"
                    />
                  </div>
                  <img class="img-fluid" :src="img" alt="" />
                </div>
                <!-- 如果當前沒有多圖或是在最後一張圖後面加上新增按鈕 -->
                <div
                  v-if="
                    !product.imagesUrl.length ||
                    product.imagesUrl[product.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="product.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="product.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <!-- 當前沒有多圖 -->
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="addImg"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="product.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="product.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="product.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="product.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="product.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="product.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model.number="product.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
              <h3 class="mb-3">主要圖片</h3>
              <div class="mb-3">
                <label for="imageUrl" class="form-label">請輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="product.imageUrl"
                />
              </div>
              <img class="img-fluid" :src="product.imageUrl" alt="" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import { editProduct, uploadProduct } from '@/api/product'
export default {
  name: 'ProductModal',
  props: {
    tempProduct: {
      type: Object,
      default: () => ({ imagesUrl: [] })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-list'],
  setup(props, { emit }) {
    const productModal = ref(null)
    let bsModal = null
    onMounted(() => {
      bsModal = new Modal(productModal.value)
    })

    const openModal = () => {
      bsModal.show()
    }

    const closeModal = () => {
      bsModal.hide()
    }

    // 將props傳入的物件先進行拷貝再進行修改
    const product = ref(props.tempProduct)
    watch(
      () => props.tempProduct,
      () => {
        product.value = { ...props.tempProduct }
      },
      { immediate: true }
    )

    // 新增圖片
    const addImg = () => {
      console.log('add')
      product.value.imagesUrl = []
      product.value.imagesUrl.push('')
    }

    // --- 修改 / 新增 產品的方法 ---
    const updateProduct = async () => {
      // 修改
      if (props.isEdit) {
        const data = await editProduct(product.value.id, product.value)
        alert(data.message)
      }
      // 新增
      if (!props.isEdit) {
        const data = await uploadProduct(product.value)
        alert(data.message)
      }
      closeModal()
      // 通知父元件更新產品列表
      emit('update-list')
    }

    return {
      productModal,
      addImg,
      closeModal,
      openModal,
      updateProduct,
      product
    }
  }
}
</script>
