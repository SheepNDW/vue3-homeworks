<template>
  <div class="container mt-3">
    <!-- 購物車列表 -->
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="col-md-2">單價</th>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr>
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm">
                x
              </button>
            </td>
            <td>
              {{}}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select id="" class="form-select">
                    <option>{{}}</option>
                  </select>
                  <span class="input-group-text" id="basic-addon2"> {{}} </span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：</small> -->
              NT${{}}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{}}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
      <CheckoutForm />
    </div>
  </div>
</template>

<script>
import CheckoutForm from './components/CheckoutForm.vue'
export default {
  name: 'Cart',
  components: { CheckoutForm }
}
</script>
