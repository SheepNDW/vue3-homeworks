<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <ProductModal
        :id="productId"
        ref="productModalCom"
        @add-cart="addToCart"
      />
      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="
                  width: 100px;
                  height: 150px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div v-if="product.price === product.origin_price" class="h5">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openProductModal(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === product.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="pagination"
        :pages="pagination"
        @change-page="changePage"
      />
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          @click="clearAllCarts"
          class="btn btn-outline-danger"
          type="button"
          :disabled="cartData?.carts?.length === 0"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="col-md-2">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData?.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  @click="removeCartItem(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      :disabled="isLoadingItem === item.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 20"
                        :key="`${num}${item.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">
                      {{ item.product.unit }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <!-- <small class="text-success">折扣價：</small> -->
                NT${{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData?.total }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cartData?.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="my-5 row justify-content-center">
      <CheckoutForm @reset-cart="reloadCart" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { getProducts } from '@/api/product'
import {
  deleteAllCarts,
  deleteCart,
  getCartList,
  insertCart,
  updateCart
} from '@/api/cart'
import ProductModal from '@/components/ProductModal'
import Pagination from '@/components/Pagination'
import CheckoutForm from '@/components/CheckoutForm'
export default {
  name: 'Home',
  components: {
    ProductModal,
    Pagination,
    CheckoutForm
  },
  setup() {
    // 調用getProduct獲取產品列表
    const products = ref(null)
    const pagination = ref(null)
    getProducts().then((data) => {
      products.value = data.products
      pagination.value = data.pagination
    })
    const changePage = (page) => {
      getProducts(page).then((data) => {
        products.value = data.products
        pagination.value = data.pagination
      })
    }
    // 獲取 productModal 元件並調用它的open方法
    const productModalCom = ref(null)
    const productId = ref('')
    const openProductModal = (id) => {
      productId.value = id
      productModalCom.value.open()
    }
    // 調用getCartList獲取購物車列表
    const cartData = ref(null)
    getCartList().then((res) => {
      cartData.value = res.data
    })
    // 添加至購物車方法
    const isLoadingItem = ref('')
    const addToCart = (id, qty = 1) => {
      isLoadingItem.value = id
      insertCart(id, qty).then(() => {
        // 重新獲取購物車內容
        getCartList().then((res) => {
          cartData.value = res.data
        })
        isLoadingItem.value = ''
      })
    }
    // 刪除購物車中產品
    const removeCartItem = (id) => {
      isLoadingItem.value = id
      deleteCart(id).then(() => {
        // 重新獲取購物車內容
        getCartList().then((res) => {
          cartData.value = res.data
        })
        isLoadingItem.value = ''
      })
    }
    const clearAllCarts = () => {
      deleteAllCarts().then(() => {
        getCartList().then((res) => {
          cartData.value = res.data
        })
      })
    }
    // 更新購物車
    const updateCartItem = (item) => {
      isLoadingItem.value = item.id
      updateCart({ prodcutId: item.id, count: item.qty }).then(() => {
        // 重新獲取購物車內容
        getCartList().then((res) => {
          cartData.value = res.data
        })
        isLoadingItem.value = ''
      })
    }

    // 送出訂單後刷新購物車內容
    const reloadCart = () => {
      getCartList().then((res) => {
        cartData.value = res.data
      })
    }

    return {
      products,
      pagination,
      openProductModal,
      productModalCom,
      productId,
      cartData,
      addToCart,
      isLoadingItem,
      removeCartItem,
      updateCartItem,
      changePage,
      clearAllCarts,
      reloadCart
    }
  }
}
</script>
