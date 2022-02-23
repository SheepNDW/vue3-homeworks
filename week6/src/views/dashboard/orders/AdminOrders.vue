<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">建立時間</th>
        <th scope="col">訂單編號</th>
        <th scope="col">金額</th>
        <th scope="col">查看詳情</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <th scope="row">
          {{ dayjs.unix(order.create_at).format('YYYY-MM-DD HH:mm:ss') }}
        </th>
        <td>{{ order.id }}</td>
        <td>NT${{ order.total }}</td>
        <td><button type="button" class="btn btn-primary">查看</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getOrdersList } from '@/api/order'
import { ref } from 'vue'
import dayjs from 'dayjs'
export default {
  name: 'AdminOrders',
  setup() {
    // 取得後台訂單列表
    const orders = ref(null)
    getOrdersList().then((data) => {
      orders.value = data.orders
    })

    return { orders, dayjs }
  }
}
</script>
