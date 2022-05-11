<template>
  <div class="modal fade" data-bs-backdrop="static" id="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0 pb-lg-3">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$store.commit('setSelectedSize', 'null')"
          ></button>
        </div>
        <div class="modal-body pb-0">
          <div class="grid">
            <div class="row">
              <div class="col-12 col-lg-7 d-flex justify-content-md-end">
                <Carousel />
              </div>
              <div class="col-12 col-lg-5 mb-1 pt-4 pt-lg-0">
                <ProductDescription />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center border-0">
          <button type="button" class="btn btn-dark" :style="{ minWidth: '30vw' }">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel.vue';
import ProductDescription from './ProductDescription.vue';

export default {
  name: 'productModal',
  components: {
    Carousel,
    ProductDescription,
  },
};
</script>
