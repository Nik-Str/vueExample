<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight">
    <div class="offcanvas-header">
      <h4 id="offcanvasRightLabel">Cart</h4>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column justify-content-between">
      <div class="testClassContainer">
        <div
          v-for="(item, index) in $store.state.cart"
          :key="index + item.title"
          class="border-bottom border-1 p-2 d-flex"
        >
          <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
            <img
              :src="`${$store.state.base_url}/image/${item.image_one}`"
              alt="Product"
              class="me-2"
              @click="$store.commit('setModal', item)"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
            />
          </div>
          <div class="w-100 testClassText">
            <p>{{ item.title }}</p>
            <p class="text-secondary">{{ item.selectedSize.toUpperCase() }}</p>
            <div class="d-flex justify-content-between">
              <p>{{ item.total }}€</p>
              <div class="d-flex">
                <i class="bi bi-dash-circle me-2" @click="$store.commit('decrementItemInCart', item)"></i>
                <p>{{ item.amount }}</p>
                <i class="bi bi-plus-circle ms-2" @click="$store.commit('incrementItemInCart', item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 p-2">
        <p class="text-decoration-underline fw-bold pb-3 text-center">Total: {{ getCartTotal }}€</p>
        <button type="button" class="btn btn-dark w-100">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartOffcanvas',
  computed: {
    ...mapGetters(['getCartTotal']),
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 4rem;
  height: auto;
}

p {
  margin-bottom: 0rem !important;
}

i:hover {
  cursor: pointer;
}

img:hover {
  cursor: pointer;
  -webkit-filter: opacity(80%);
  filter: opacity(80%);
}
</style>
