<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>{{ product.title }}</h5>
      <h6>{{ product.price }}€</h6>
    </div>
    <p class="text-secondary fw-bold mb-2">{{ product.brand }}</p>
    <select
      class="form-select mb-3"
      :value="$store.state.modalSelectedSize"
      @input="(e) => $store.commit('setSelectedSize', e.target.value)"
    >
      <option selected value="null">Choose Size</option>
      <option v-if="product.s" value="s">S</option>
      <option v-if="product.m" value="m">M</option>
      <option v-if="product.l" value="l">L</option>
      <option v-if="product.xl" value="xl">XL</option>
    </select>
    <p><span class="fw-bold mb-3">Description</span><br />{{ product.description }}</p>
    <p class="m-0"><span class="fw-bold">Specification</span><br /></p>
    <ul class="ps-3">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { toRaw } from 'vue';

export default {
  computed: {
    product() {
      return this.$store.state.modal;
    },
    list() {
      const data = toRaw(this.$store.state.modal);
      if (data?.specification) {
        const specificationList = JSON.parse(data.specification);
        return specificationList.data;
      }
    },
  },
};
</script>
