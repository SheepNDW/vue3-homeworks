<template>
  <div class="col-md-6">
    <div class="d-flex align-items-center mb-3">
      <h3 class="fs-5 m-0">購買產品內容</h3>
      <button
        type="button"
        class="btn btn-sm ms-2"
        v-if="!order.is_paid"
        :class="isEditProduct ? 'btn-danger' : 'btn-primary'"
        @click="isEditProduct = !isEditProduct"
      >
        <span v-if="!isEditProduct">修改</span>
        <span v-else>完成</span>
      </button>
      <small class="text-danger ms-auto" v-if="order.code"
        >優惠碼：{{ order.code }}</small
      >
    </div>
    <ul class="list-unstyled">
      <li
        class="d-flex align-items-center mb-2"
        v-for="item in order.products"
        :key="item"
      >
        <div class="cart-cont col px-3 d-flex">
          <div class="col-5">
            <p class="m-0">{{ item.product.title }}</p>
            <small>${{ item.product.price }} NTD</small>
          </div>
          <div class="col-5 d-flex align-items-center text-nowrap">
            數量：
            <input
              type="number"
              min="1"
              max="10"
              class="form-control form-control-sm"
              v-model.number="item.qty"
              :disabled="!isEditProduct"
            />
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-danger d-flex"
              :disabled="!isEditProduct"
            >
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="d-flex justify-content-between align-items-center border rounded p-2 my-2"
    >
      <p class="m-0">品項：{{ Object.keys(order.products).length }}</p>
      <p class="m-0">
        訂單金額：
        <span class="fs-5 fw-bold text-danger">{{ '$' + order.total }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  name: 'OrderDetail',
  setup() {
    const isEditProduct = ref(false)
    const order = inject('tempOrder')

    return { isEditProduct, order }
  }
}
</script>
