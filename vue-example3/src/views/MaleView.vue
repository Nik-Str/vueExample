<template>
  <div class="container">
    <!-- Menu -->
    <FilterMenu title="Male" />
    <!-- Products -->
    <Products v-if="!$store.state.isLoading" :products="getDisplayedProducts" />
    <!-- Loading -->
    <Loading v-if="$store.state.isLoading" />
  </div>
</template>

<script>
import FilterMenu from '../components/FilterMenu.vue';
import Products from '../components/Products.vue';
import Loading from '../components/Loading.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'MaleView',
  components: {
    FilterMenu,
    Products,
    Loading,
  },
  computed: {
    ...mapGetters(['getDisplayedProducts']),
  },
  mounted() {
    this.$store.dispatch('getProducts', 'male');
  },
};
</script>
