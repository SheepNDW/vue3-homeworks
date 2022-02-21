<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-3">分類區</div>
      <div class="col-md-9">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from './components/ProductsList.vue'
export default {
  name: 'ProductsPage',
  components: { ProductsList }
}
</script>
