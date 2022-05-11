<template>
  <div class="container-fluid">
    <h2 class="mt-4">Products</h2>
    <div class="d-flex justify-content-center flex-row flex-wrap">
      <div
        class="card m-2"
        :style="{ width: '12rem', height: 'auto' }"
        v-for="(item, index) in data"
        :key="index"
        @click="handleAdd(item.id)"
      >
        <img :src="item.image" class="card-img-top p-2" alt="product" />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    data: Array,
    isLoading: Boolean,
    isError: String || null,
  },
  methods: {
    handleAdd(id) {
      this.$emit('handleAddToCart', id);
    },
  },
  emits: ['handleAddToCart'],
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>
