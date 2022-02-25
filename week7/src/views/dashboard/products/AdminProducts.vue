<template>
  <!-- 頭部區域 -->
  <HeaderAdmin />
  <!-- 卡片視圖 -->
  <div class="flex-fill overflow-auto p-3">
    <div class="card p-2 shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <select class="form-select filter-form">
            <option value="all" selected>全部商品</option>
            <option v-for="i in 4" :key="i" :value="i">
              {{ i }}
            </option>
          </select>

          <button
            class="btn btn-primary ms-auto"
            type="button"
            @click="openModal('new')"
          >
            <i class="fas fa-plus-circle"></i>
            新增產品
          </button>
        </div>
        <ul
          class="row g-0 list-unstyled rounded-0 p-2 products-list text-nowrap border-bottom border-2"
        >
          <li class="col-2 d-none d-md-block">分類</li>
          <li class="col-3 text-start">商品名稱</li>
          <li class="col-2">原價</li>
          <li class="col-2">售價</li>
          <li class="col-1">啟用</li>
          <li class="col-3 col-md-2">操作</li>
        </ul>
        <ul class="list-group list-group-flush shadow-sm mb-4" v-if="products">
          <li
            class="list-group-item p-2"
            v-for="product in products"
            :key="product.id"
          >
            <div class="col-2 d-none d-md-block">
              <span class="badge bg-info fw-bold">
                {{ product.category }}
              </span>
            </div>
            <div class="col-3 text-start">{{ product.title }}</div>
            <div class="col-2">{{ product.origin_price }}</div>
            <div class="col-2">{{ product.price }}</div>
            <div class="col-1 text-success" v-if="product.is_enabled">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="col-1 text-danger" v-else>
              <i class="fas fa-times-circle"></i>
            </div>
            <div class="col-3 col-md-2 d-flex justify-content-center">
              <button
                class="btn btn-sm btn-outline-primary fs-7"
                type="button"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                class="btn btn-sm btn-outline-danger fs-7 ms-2 ms-md-3"
                type="button"
                @click="openModal()"
              >
                刪除
              </button>
            </div>
          </li>
        </ul>
        <!-- 分頁元件 -->
        <UiPagination
          v-if="pagination?.total_pages > 1"
          :pages="pagination"
          @change-page="changePager"
        />
        <!-- Modal元件 -->
        <ProductModal
          ref="productModalCom"
          :temp-product="tempProduct"
          :is-edit="isEdit"
          @update-list="getProducts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/AppHeaderAdmin.vue'
import ProductModal from './components/ProductModal.vue'
import { getAdminProducts } from '@/api/product'
import { ref } from 'vue'
export default {
  name: 'AdminProducts',
  components: { HeaderAdmin, ProductModal },
  setup() {
    // 取得後台產品列表
    const products = ref(null)
    const pagination = ref(null)
    const getProducts = async (page) => {
      const data = await getAdminProducts(page)
      products.value = data.products
      pagination.value = data.pagination
    }
    getProducts()

    // 換頁函式
    const changePager = async (page) => {
      getProducts(page)
    }

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

    return {
      products,
      pagination,
      changePager,
      tempProduct,
      isEdit,
      openModal,
      productModalCom,
      getProducts
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-form {
  max-width: 200px;
}

// 列表標題欄
.products-list {
  text-align: center;
}

// 產品列表
.list-group-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
