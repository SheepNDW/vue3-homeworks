<template>
  <Loading :active="isLoading" />
  <ProductModal
    ref="productModalCom"
    :tempProduct="tempProduct"
    :is-edit="isEdit"
    @update-list="getProducts"
  />
  <div class="text-end mt-4">
    <button class="btn btn-primary addproduct-btn" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <div class="row">
    <table class="table table-hover table-striped table align-middle mt-4">
      <thead>
        <tr>
          <th width="100">類別</th>
          <th width="240">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="150">狀態</th>
          <th width="120">操作</th>
        </tr>
      </thead>
      <tbody class="productList" v-if="products">
        <tr v-for="product in products" :key="product.id">
          <td scope="row">
            <span class="badge bg-success fw-light">
              {{ product.category }}
            </span>
          </td>
          <td width="240">
            <div class="info">
              <img :src="product.imageUrl" alt="" />
              {{ product.title }}
            </div>
          </td>
          <td width="120">{{ product.origin_price }}</td>
          <td width="120">{{ product.price }}</td>
          <td width="100">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="enabledSwitch"
                :true-value="1"
                :false-value="0"
                v-model.number="product.is_enabled"
                @change="updateProduct(product)"
              />
            </div>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td width="120">
            <button
              type="button"
              class="me-1 btn btn-sm btn-outline-primary"
              @click="openModal('edit', product)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger move deleteBtn"
              @click="removeProduct(product.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <UiPagination
      v-if="pagination?.total_pages > 1"
      :pages="pagination"
      @change-page="changePager"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { deleteProduct, editProduct, getAdminProducts } from '@/api/product'
import ProductModal from './components/ProductModal.vue'
export default {
  name: 'AdminProducts',
  components: { ProductModal },
  setup() {
    // 取得後台產品列表
    const isLoading = ref(true)
    const products = ref(null)
    const pagination = ref(null)
    const getProducts = async (page) => {
      isLoading.value = true
      const data = await getAdminProducts(page)
      products.value = data.products
      pagination.value = data.pagination
      isLoading.value = false
    }
    onMounted(() => getProducts())

    // 想要顯示在modal的產品
    const tempProduct = ref({
      imagesUrl: []
    })

    // 打開modal
    const productModalCom = ref(null)
    const isEdit = ref(false)
    const openModal = (status, product = { imagesUrl: [], is_enabled: 1 }) => {
      tempProduct.value = product
      if (status === 'new') isEdit.value = false
      if (status === 'edit') isEdit.value = true
      productModalCom.value.openModal()
    }

    // 刪除產品方法
    const removeProduct = async (id) => {
      const data = await deleteProduct(id)
      alert(data.message)
      getProducts()
    }

    // switchbox切換事件
    const updateProduct = async (product) => {
      const data = await editProduct(product.id, product)
      alert(data.message)
    }

    // 換頁函式
    const changePager = async (page) => {
      getProducts(page)
    }

    return {
      isLoading,
      products,
      productModalCom,
      openModal,
      tempProduct,
      isEdit,
      getProducts,
      removeProduct,
      updateProduct,
      pagination,
      changePager
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.btn:focus {
  box-shadow: none !important;
}

a:focus {
  box-shadow: none !important;
}

.productList .info {
  display: flex;
  text-align-last: left;
  align-items: center;
}

.productList .info img {
  height: 70px;
  width: 70px;
  margin-right: 20px;
}

.productList button {
  width: 33px;
}
</style>
