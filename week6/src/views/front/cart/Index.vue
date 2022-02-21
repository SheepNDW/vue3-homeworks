<template>
  <div class="container mt-3">
    <Loading :active="isLoading" />
    <!-- 購物車列表 -->
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button">清空購物車</button>
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
        <template v-if="$store.state.cart.cartData.carts">
          <tr v-for="item in $store.state.cart.cartData.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm">
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select id="" class="form-select">
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
      <tfoot v-if="$store.state.cart.cartData.carts">
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ $store.state.cart.cartData.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">
            {{ $store.state.cart.cartData.final_total }}
          </td>
        </tr>
      </tfoot>
      <CartNone v-else />
    </table>
    <div class="my-5 row justify-content-center">
      <CheckoutForm />
    </div>
  </div>
</template>

<script>
import CheckoutForm from './components/CheckoutForm.vue'
import CartNone from './components/CartNone.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  name: 'Cart',
  components: { CheckoutForm, CartNone },
  setup() {
    const isLoading = ref(true)
    // 獲取購物車清單
    const store = useStore()
    store.dispatch('cart/findCart').then(() => {
      isLoading.value = false
    })

    return { isLoading }
  }
}
</script>
