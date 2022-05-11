<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center pt-4 pb-2">
      <h1>Favourites</h1>
      <button
        type="button"
        class="btn btn-link text-dark text-decoration-none"
        @click="$store.commit('removeAllFromFavourites')"
      >
        <i class="bi bi-star me-1"></i>Clear
      </button>
    </div>
    <Products :products="$store.state.favourites" />
  </div>
</template>

<script>
import Products from '../components/Products.vue';

export default {
  name: 'Favourites',
  components: {
    Products,
  },
};
</script>

<style></style>
