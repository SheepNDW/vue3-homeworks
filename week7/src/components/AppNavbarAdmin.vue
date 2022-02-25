<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand" to="/admin">後台管理頁</RouterLink>
      <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center">
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/">回到前台</RouterLink>
          <RouterLink class="nav-link" to="/admin/products"
            >產品列表</RouterLink
          >
          <RouterLink class="nav-link" to="/admin/orders">訂單管理</RouterLink>
        </div>
      </div>
      <div class="navbar-nav">
        <button class="btn btn-success" type="button" @click="logout">
          登出
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'NavbarAdmin',
  setup() {
    const router = useRouter()
    const logout = () => {
      // 清除token 跳回首頁
      document.cookie = 'hexToken=;expires=;'
      router.push('/')
    }

    return { logout }
  }
}
</script>
