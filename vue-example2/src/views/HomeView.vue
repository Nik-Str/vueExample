<template>
  <div class="container-fluid mt-3">
    <div class="d-flex justify-content-center mt-3" v-if="!isLoading">
      <Filter text="Men" @handleClick="handleFilterMale" />
      <Filter text="Woman" @handleClick="handleFilterFemal" />
      <Filter text="All" @handleClick="handleFilterAll" />
    </div>
    <Products
      :data="isShowing"
      :isLoading="isLoading"
      :isError="isError"
      v-if="data && !isLoading"
      @handleAddToCart="handleAddToCart"
    />
    <Loading v-if="isLoading" />
    <Cart :cart="cart" :total="total" />
  </div>
</template>

<script>
import Products from '../components/home/Products.vue';
import Loading from '../components/home/Loading.vue';
import Filter from '../components/home/Filter.vue';
import Cart from '../components/home/Cart.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      data: [],
      isLoading: false,
      isError: null,
      isShowing: [],
      cart: [],
      total: 0,
    };
  },
  components: {
    Products,
    Loading,
    Filter,
    Cart,
  },
  methods: {
    getProducts: function () {
      this.isLoading = true;
      this.isError = null;

      fetch(`http://localhost:3000/products`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          this.data = res;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isError = err;
        });
    },
    handleFilterMale() {
      this.isShowing = this.data.filter((item) => item.sex === 'male');
    },
    handleFilterFemal() {
      this.isShowing = this.data.filter((item) => item.sex === 'female');
    },
    handleFilterAll() {
      this.isShowing = this.data;
    },
    handleAddToCart(id) {
      const product = this.data.filter((item) => item.id === id);
      this.cart = [...this.cart, ...product];
    },
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    data(state) {
      this.isShowing = state;
    },
    cart(state) {
      this.total =
        state.length > 1
          ? state.reduce((sum, add) => {
              return sum + add.price;
            }, 0)
          : state[0].price;
    },
  },
};
</script>
