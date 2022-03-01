<template>
  <div ref="orderModal" class="modal fade" id="orderModal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content" v-if="order?.id">
        <div class="modal-header bg-dark p-3 text-light">
          <h5 class="modal-title" id="orderModalLabel">
            訂單編號：{{ order.id }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="nav rounded p-2 mb-3 d-flex align-items-center">
            <div>
              訂單狀態：
              <span class="text-success" v-if="order.is_paid">已付款</span>
              <span class="text-danger" v-else>未付款</span>
            </div>
            <router-link
              type="button"
              class="btn btn-sm btn-outline-secondary ms-2"
              target="_blank"
              to="/"
              >前往付款</router-link
            >
          </div>
          <div class="row g-3 d-md-flex">
            <!-- 訂購人資訊 -->
            <UserInfo />
            <!-- 訂單細項 -->
            <OrderDetail />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            取消
          </button>
          <button type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import { useBsModal } from '@/hooks'
import UserInfo from './UserInfo.vue'
import OrderDetail from './OrderDetail.vue'
export default {
  name: 'OrderModal',
  components: { UserInfo, OrderDetail },
  setup() {
    const orderModal = ref(null)
    const { openModal, closeModal } = useBsModal(orderModal)

    // 接收外層元件提供的tempOrder
    const order = inject('tempOrder')

    return {
      orderModal,
      openModal,
      closeModal,
      order
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-body .nav {
  background: #e9ecef;
}
</style>
