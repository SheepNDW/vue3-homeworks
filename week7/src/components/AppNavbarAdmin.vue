<template>
  <nav
    class="navbar navbar-dark navbar-expand-lg p-3 d-flex flex-lg-column align-items-start"
  >
    <RouterLink to="/admin" target="_blank" class="navbar-brand fs-6 fw-light"
      >BookStore</RouterLink
    >
    <button
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#nav-collapse"
    >
      <i class="navbar-toggler-icon"></i>
    </button>
    <div class="collapse navbar-collapse" id="nav-collapse">
      <ul class="navbar-nav d-flex flex-column mt-lg-4">
        <li class="nav-item">
          <RouterLink class="nav-link px-0" to="/admin/products"
            >產品管理</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-0" to="/">優惠券管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-0" to="/admin/orders"
            >訂單管理</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-0" to="/">文章管理</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarAdmin'
}
</script>
