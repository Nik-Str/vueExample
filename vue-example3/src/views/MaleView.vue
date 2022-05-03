<template>
  <div class="container">
    <!-- Menu -->
    <div class="d-flex justify-content-between align-items-center pt-4 pb-2">
      <h1>Male</h1>
      <div>
        <button
          type="button"
          class="btn btn-link text-dark text-decoration-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasLeft"
        >
          <i class="bi bi-sliders2 me-1"></i>Filter
        </button>
      </div>
    </div>
    <!-- Products -->
    <div>
      <div class="grid">
        <div class="row">
          <div
            class="card col-6 col-md-4 col-lg-3 px-3 py-1 border-0"
            v-for="item in $store.state.products.data"
            :key="item.id"
          >
            <img :src="item.image" class="card-img-top" alt="product" />
            <div class="card-body p-1">
              <div class="d-flex justify-content-between">
                <p
                  class="card-title mb-0"
                  :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
                >
                  {{ item.title }}
                </p>
                <i class="bi bi-star ps-4"></i>
              </div>

              <div class="mt-0" :style="{ fontSize: '0.9rem' }">
                <p class="text-secondary mb-0">{{ item.brand }}</p>
                <p class="fw-bold">{{ item.price }} kr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from '../components/Products.vue';

export default {
  name: 'MaleView',

  components: {
    Products,
  },
  actions: {},
  mounted() {
    this.$store.dispatch('getProducts', 'male');
  },
};
</script>

<style lang="scss" scoped>
.bi-star:hover {
  cursor: pointer;
}
</style>
