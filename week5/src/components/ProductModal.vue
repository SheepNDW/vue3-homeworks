<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0" v-if="product">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img
                class="img-fluid"
                :src="product.imageUrl"
                style="height: 400px"
                alt=""
              />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">
                {{ product.category }}
              </span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div v-if="product.price === product.origin_price" class="h5">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="qty"
                  />
                  <button
                    @click="addToCart"
                    type="button"
                    class="btn btn-primary"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import { getProductById } from '@/api/product'
export default {
  name: 'ProductModal',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const modal = ref(null)
    let bsModal = null
    onMounted(() => {
      bsModal = new Modal(modal.value)
    })

    const open = () => {
      bsModal.show()
    }

    const close = () => {
      bsModal.hide()
    }

    // 取得顯示產品的資料
    const product = ref(null)
    watch(
      () => props.id,
      () => {
        getProductById(props.id).then((data) => {
          product.value = data.product
        })
      }
    )

    // 加到購物車方法
    const qty = ref(1)
    const addToCart = () => {
      emit('add-cart', product.value.id, qty.value)
      close()
    }

    return { modal, open, close, product, qty, addToCart }
  }
}
</script>

<style lang="scss" scoped></style>
