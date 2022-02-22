<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top"
  >
    <div class="container">
      <RouterLink class="navbar-brand" to="/">前台頁面</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">
              前台產品列表
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cart">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin">前往後臺</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>
