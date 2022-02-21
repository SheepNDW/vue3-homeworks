<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="width: 200px">
          <div
            style="
              width: 100px;
              height: 150px;
              background-size: cover;
              background-position: center;
            "
          ></div>
        </td>
        <td>{{}}</td>
        <td>
          <div class="h5">{{}} 元</div>
          <div>
            <del class="h6">原價 {{}} 元</del>
            <div class="h5">現在只要 {{}} 元</div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary">
              查看更多
            </button>
            <button type="button" class="btn btn-danger">
              <span class="spinner-grow spinner-grow-sm"></span>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ProductsList'
}
</script>
