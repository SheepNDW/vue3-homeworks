<template>
  <!-- 頭部區域 -->
  <HeaderAdmin subTitle="優惠券管理" />
  <!-- 卡片視圖 -->
  <div class="flex-fill overflow-auto p-3">
    <div class="card p-2 shadow-sm">
      <div class="card-body">優惠券管理頁</div>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/AppHeaderAdmin.vue'
export default {
  name: 'AdminCoupon',
  components: { HeaderAdmin }
}
</script>
