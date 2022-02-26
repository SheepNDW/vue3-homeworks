<template>
  <form
    ref="productModal"
    class="modal fade"
    id="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          新增產品
          <button
            type="button"
            class="btn-close me-1"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <!-- tabs標題 -->
          <ul class="nav nav-tabs" id="productTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="info-tab"
                data-bs-toggle="tab"
                data-bs-target="#info"
                type="button"
                role="tab"
              >
                產品資訊
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="content-tab"
                data-bs-toggle="tab"
                data-bs-target="#content"
                type="button"
                role="tab"
              >
                產品內容
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="picture-tab"
                data-bs-toggle="tab"
                data-bs-target="#picture"
                type="button"
                role="tab"
              >
                產品圖片
              </button>
            </li>
          </ul>
          <!-- tabs內容區域 -->
          <div class="tab-content" id="tabContent">
            <!-- 產品資訊 -->
            <div class="tab-pane fade show" id="info" role="tabpanel">
              <div class="row g-2">
                <div class="col-8">
                  <label class="form-label" for="product-title">
                    商品名稱<small class="text-danger ms-1">*</small>
                  </label>
                  <input
                    type="text"
                    id="product-title"
                    class="form-control"
                    placeholder="輸入商品名稱"
                    required
                  />
                </div>
                <div class="col-4">
                  <label class="form-label" for="product-category">
                    商品類別<small class="text-danger ms-1">*</small>
                  </label>
                  <select
                    id="product-category"
                    class="form-control form-select"
                    required
                  >
                    <option value="" selected disabled>選擇類別</option>
                    <option v-for="i in 4" :key="i" :value="i">
                      {{ i }}
                    </option>
                  </select>
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-origin-price">
                    原價<small class="text-danger ms-1">*</small>
                  </label>
                  <input
                    type="number"
                    min="0"
                    id="product-origin-price"
                    class="form-control"
                    placeholder="輸入原價"
                    required
                  />
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-price">
                    售價<small class="text-danger ms-1">*</small>
                  </label>
                  <input
                    type="number"
                    min="0"
                    id="product-price"
                    class="form-control"
                    placeholder="輸入售價"
                    required
                  />
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-unit">
                    單位<small class="text-danger ms-1">*</small>
                  </label>
                  <select
                    id="product-unit"
                    class="form-control form-select"
                    required
                  >
                    <option value="" selected disabled>選擇單位</option>
                    <option v-for="i in 4" :key="i" :value="i">
                      {{ i }}
                    </option>
                  </select>
                </div>
                <hr class="mt-4" />
                <div class="col-4 d-flex align-items-center">
                  <label class="form-label m-0" for="product-active"
                    >上架商品</label
                  >
                  <div class="switch-group ms-2">
                    <input type="checkbox" id="product-active" role="button" />
                    <div class="ico_switch"></div>
                  </div>
                </div>
                <div class="col-4 d-flex align-items-center">
                  <label class="form-label m-0" for="product-promote"
                    >人氣推薦</label
                  >
                  <div class="switch-group ms-2">
                    <input type="checkbox" id="product-promote" role="button" />
                    <div class="ico_switch"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 產品內容 -->
            <div class="tab-pane fade show" id="content" role="tabpanel">
              <div class="row g-0">
                <div class="col-12">
                  <label class="form-label" for="product-desc">產品描述</label>
                  <input
                    type="text"
                    class="form-control"
                    id="product-desc"
                    placeholder="輸入產品內容"
                  />
                </div>
                <div class="col-12 mt-2">
                  <label class="form-label" for="product-content"
                    >產品內容</label
                  >
                  <textarea
                    id="product-content"
                    class="form-control"
                    style="min-height: 120px"
                    placeholder="輸入產品內容"
                    row="5"
                  />
                </div>
              </div>
            </div>
            <!-- 產品圖片 -->
            <div class="tab-pane fade show active" id="picture" role="tabpanel">
              <div class="row">
                <!-- 主圖 -->
                <div class="col-12 mt-2">
                  <h3 class="mb-3">
                    新增主圖<small class="text-danger ms-1">*</small>
                  </h3>
                  <div>
                    <div class="mb-1">
                      <div class="mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="請輸入圖片連結"
                        />
                      </div>
                      <img class="img-fluid" src="" alt="" />
                    </div>
                  </div>
                </div>
                <!-- 其他附圖 -->
                <div class="col-12 mt-2">
                  <h3 class="mb-3">其他圖片</h3>
                  <div>
                    <div class="mb-1">
                      <div class="mb-3">
                        <label for="imageUrl" class="form-label"
                          >輸入圖片網址</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="請輸入圖片連結"
                        />
                      </div>
                      <img class="img-fluid" src="" alt="" />
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <label class="form-label" for="product-upload-file"
                    >上傳圖片</label
                  >
                  <div class="input-group">
                    <input
                      type="file"
                      name="file-to-upload"
                      class="form-control"
                      id="product-upload-file"
                      ref="upload-file"
                    /><button class="btn btn-outline-secondary">
                      上傳圖片
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="submit" class="btn btn-primary">確定</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import 'bootstrap/dist/js/bootstrap.bundle'
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
