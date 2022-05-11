<template>
  <div id="carouselExampleControls" class="carousel slide carousel-fade carouselContainer" data-bs-ride="carousel">
    <div class="carousel-inner">
      <!-- V-for for every image -->
      <div class="carousel-item active">
        <img :src="`${$store.state.base_url}/image/${product.image_one}`" alt="product" />
      </div>
      <!-- Example of more image remove on v-for -->
      <div class="carousel-item">
        <img :src="`${$store.state.base_url}/image/${product.image_two}`" alt="product" />
      </div>
      <div class="carousel-item">
        <img :src="`${$store.state.base_url}/image/${product.image_three}`" alt="product" />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  computed: {
    product() {
      return this.$store.state.modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.carouselContainer {
  max-width: 100%;

  img {
    max-width: 100%;
    height: auto;
  }
}

@media only screen and (min-width: 992px) {
  .carouselContainer {
    max-width: 25rem;

    img {
      max-width: 25rem;
      height: auto;
    }
  }
}
</style>
