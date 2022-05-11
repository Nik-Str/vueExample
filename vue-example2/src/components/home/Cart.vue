<template>
  <div class="mt-5">
    <h3>Cart</h3>
    <div class="d-flex justify-content-center mt-3">
      <div class="cartContainer">
        <ul class="list-group">
          <li class="list-group-item" v-for="(item, index) in cart" :key="index">
            {{ item.title + ' ' + item.price }}
          </li>
        </ul>
        <p>Total: {{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: Array,
    total: Number,
  },
};
</script>

<style lang="scss" scoped>
.cartContainer {
  width: 30vw;
}
</style>
