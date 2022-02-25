<template>
  <NavbarAdmin />
  <div class="container mt-2">
    <router-view v-if="checkSuccess" />
  </div>
</template>

<script>
import NavbarAdmin from '@/components/AppNavbarAdmin.vue'
import { onMounted, ref } from 'vue'
import { userCheck } from '@/api/login'
export default {
  name: 'Dashboard',
  components: { NavbarAdmin },
  setup() {
    const checkSuccess = ref(false)
    const checkLogin = async () => {
      await userCheck()
      checkSuccess.value = true
    }

    onMounted(() => checkLogin())

    return { checkSuccess }
  }
}
</script>
