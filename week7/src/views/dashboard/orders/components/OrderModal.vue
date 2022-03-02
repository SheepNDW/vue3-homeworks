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
            <div class="form-check ms-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                v-model="paidStatus"
                @change="updatePaid"
              />
            </div>
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
import { inject, ref, watch } from 'vue'
import { useBsModal } from '@/hooks'
import UserInfo from './UserInfo.vue'
import OrderDetail from './OrderDetail.vue'
export default {
  name: 'OrderModal',
  components: { UserInfo, OrderDetail },
  setup() {
    const orderModal = ref(null)
    const { openModal, closeModal } = useBsModal(orderModal)

    // 接收外層元件提供的 tempOrder 並將付款狀態(is_paid)賦值給 paidStatus 去做更改
    const order = inject('tempOrder')
    const { updatePaid } = inject('updatePaid')
    const paidStatus = ref(null)
    watch(
      () => order,
      () => {
        paidStatus.value = order.value.is_paid
      }
    )

    return {
      orderModal,
      openModal,
      closeModal,
      order,
      paidStatus,
      updatePaid
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-body .nav {
  background: #e9ecef;
}
</style>
