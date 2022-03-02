<template>
  <!-- 頭部區域 -->
  <HeaderAdmin subTitle="訂單管理" />
  <!-- 卡片視圖 -->
  <div class="flex-fill overflow-auto p-3" style="position: relative">
    <!-- Loading 元件 -->
    <Loading :active="isLoading" :is-full-page="false" />
    <div class="card p-2 shadow-sm" style="min-height: 200px">
      <div class="card-body">
        <div class="d-flex justify-content-end align-items-center mb-3">
          <button class="btn btn-danger d-flex" type="button">
            <i class="material-icons me-1">delete</i>
            刪除全部訂單
          </button>
        </div>
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col">建立時間</th>
              <th scope="col">購買款項</th>
              <th scope="col">金額</th>
              <th scope="col">狀態</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <th scope="row">
                {{ dayjs.unix(order.create_at).format('YYYY-MM-DD HH:mm:ss') }}
              </th>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in order.products" :key="i">
                    {{ product.product.title }} 數量：{{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>NT${{ order.total }}</td>
              <td>
                <span v-if="order.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="open(order)"
                  >
                    查看
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <GoPagination
          v-if="pagination?.total_pages > 1"
          :pages="pagination"
          @change-page="changePager"
        />
      </div>
    </div>
  </div>
  <OrderModal ref="orderModalCom" @update-list="updateOrderList" />
</template>

<script>
import HeaderAdmin from '@/components/AppHeaderAdmin.vue'
import OrderModal from './components/OrderModal.vue'
import { getOrdersList } from '@/api/order'
import { provide, readonly, ref } from 'vue'
import dayjs from 'dayjs'
export default {
  name: 'AdminOrders',
  components: { HeaderAdmin, OrderModal },
  setup() {
    const isLoading = ref(true)
    const orderModalCom = ref(null)

    // 取得後台訂單列表
    const orders = ref(null)
    const pagination = ref(null)
    const getOrders = async (page) => {
      isLoading.value = true
      const data = await getOrdersList(page)
      orders.value = data.orders
      pagination.value = data.pagination
      isLoading.value = false
    }
    getOrders()

    // 修改完畢後重新取得訂單列表, 換頁函式
    const updateOrderList = () => getOrders()
    const changePager = (page) => getOrders(page)

    // 查看訂單細節 (使用 provide 傳入讓所有後代元件可以共享)
    const tempOrder = ref({})
    const open = (order) => {
      tempOrder.value = order
      orderModalCom.value.openModal()
    }
    // 修改 tempOrder 資料的相關的函式
    const updatePaid = () => {
      tempOrder.value.is_paid = !tempOrder.value.is_paid
    }
    const updateTempUser = (userInfo) => {
      tempOrder.value.user = userInfo
    }
    const updateMessage = (msg) => {
      tempOrder.value.message = msg
    }
    provide('tempOrder', readonly(tempOrder))
    provide('updatePaid', { updatePaid })
    provide('updateTempUser', { updateTempUser })
    provide('updateMessage', { updateMessage })

    return {
      orderModalCom,
      isLoading,
      updateOrderList,
      changePager,
      orders,
      dayjs,
      pagination,
      open,
      tempOrder
    }
  }
}
</script>
