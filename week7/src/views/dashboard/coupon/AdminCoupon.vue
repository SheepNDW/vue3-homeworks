<template>
  <!-- 頭部區域 -->
  <HeaderAdmin subTitle="優惠券管理" />
  <!-- 卡片視圖 -->
  <div class="flex-fill overflow-auto p-3" style="position: relative">
    <!-- Loading 元件 -->
    <Loading :active="isLoading" :is-full-page="false" />
    <div class="card p-2 shadow-sm" style="min-height: 200px">
      <div class="card-body">
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-primary ms-auto d-flex" type="button">
            <i class="material-icons me-2">add_circle_outline</i>
            新增優惠券
          </button>
        </div>
        <ul
          class="row g-0 list-unstyled rounded-0 p-2 coupons-list text-nowrap border-bottom border-2"
        >
          <li class="col-2 text-start">優惠券名稱</li>
          <li class="col-2">優惠碼</li>
          <li class="col-2">折扣</li>
          <li class="col-2">有效期限</li>
          <li class="col-2">狀態</li>
          <li class="col-2">操作</li>
        </ul>
        <ul class="list-group list-group-flush shadow-sm mb-4">
          <li class="list-group-item p-2" v-for="i in 3" :key="i">
            <div class="col-2 text-start">{{ 'test' }}</div>
            <div class="col-2">{{ 'test' }}</div>
            <div class="col-2">{{ 'test' }}</div>
            <div class="col-2">{{ 'test' }}</div>
            <div class="col-2 text-success">
              <i class="material-icons">check_circle</i>
            </div>
            <div class="col-2 d-flex justify-content-center">
              <button class="btn btn-sm btn-outline-primary fs-7" type="button">
                編輯
              </button>
              <button
                class="btn btn-sm btn-outline-danger fs-7 ms-2 ms-md-3"
                type="button"
              >
                刪除
              </button>
            </div>
          </li>
        </ul>
        <!-- 分頁元件 -->
        <!-- <GoPagination
          v-if="pagination?.total_pages > 1"
          :pages="pagination"
          @change-page="changePager"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import HeaderAdmin from '@/components/AppHeaderAdmin.vue'
export default {
  name: 'AdminCoupon',
  components: { HeaderAdmin },
  setup() {
    const isLoading = ref(false)

    return {
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
// 標題欄
.coupons-list {
  text-align: center;
  background: #e9ecef;
}

// 優惠券列表
.list-group-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
