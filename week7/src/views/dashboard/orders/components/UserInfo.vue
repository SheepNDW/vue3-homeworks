<template>
  <div class="col-md-6">
    <h3 class="fs-5 d-flex align-items-center mb-3">
      訂購人資訊
      <button
        type="button"
        class="btn btn-sm ms-2"
        :class="isEditInfo ? 'btn-danger' : 'btn-primary'"
        @click="isEditInfo = !isEditInfo"
      >
        <span v-if="!isEditInfo">修改</span>
        <span v-else>完成</span>
      </button>
    </h3>
    <ul class="list-unstyled">
      <li class="d-flex align-items-center mb-2">
        <span class="form-label m-0 col-4">建立時間：</span>
        <span>{{
          dayjs.unix(order.create_at).format('YYYY-MM-DD HH:mm:ss')
        }}</span>
      </li>
      <li class="d-flex align-items-center mb-1">
        <label for="email" class="form-label m-0 col-4">Email：</label>
        <input
          type="email"
          id="email"
          class="form-control form-control-sm"
          v-model="order.user.email"
          :disabled="!isEditInfo"
        />
      </li>
      <li class="d-flex align-items-center mb-1">
        <label for="name" class="form-label m-0 col-4">收件人姓名：</label>
        <input
          type="text"
          id="name"
          class="form-control form-control-sm"
          v-model="order.user.name"
          :disabled="!isEditInfo"
        />
      </li>
      <li class="d-flex align-items-center mb-1">
        <label for="tel" class="form-label m-0 col-4">聯絡電話：</label>
        <input
          type="text"
          id="tel"
          class="form-control form-control-sm"
          v-model="order.user.tel"
          :disabled="!isEditInfo"
        />
      </li>
      <li class="d-flex align-items-center mb-1">
        <label for="address" class="form-label m-0 col-4">收件地址：</label>
        <input
          type="text"
          id="address"
          class="form-control form-control-sm"
          v-model="order.user.address"
          :disabled="!isEditInfo"
        />
      </li>
      <li class="d-flex align-items-start mb-1">
        <label for="message" class="form-label m-0 col-4">備註</label>
        <textarea
          id="message"
          class="form-control"
          row="3"
          placeholder="無"
          v-model="order.message"
          :disabled="!isEditInfo"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import dayjs from 'dayjs'
export default {
  name: 'UserInfo',
  setup() {
    const isEditInfo = ref(false)

    // 接收外層元件提供的tempOrder
    const order = inject('tempOrder')

    return { isEditInfo, order, dayjs }
  }
}
</script>
