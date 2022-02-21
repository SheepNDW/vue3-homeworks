<template>
  <NavbarAdmin />
  <div class="container mt-2">
    <router-view />
  </div>
</template>

<script>
import NavbarAdmin from '@/components/AppNavbarAdmin.vue'
export default {
  name: 'Dashboard',
  components: { NavbarAdmin }
}
</script>
