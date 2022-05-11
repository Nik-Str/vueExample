<template>
  <div>
    <header>
      <Navbar />
    </header>
    <body>
      <router-view />
      <CartOffcanvas />
      <FilterOffcanvas />
      <ProductModal />
    </body>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import CartOffcanvas from './components/CartOffcanvas.vue';
import FilterOffcanvas from './components/FilterOffcanvas.vue';
import ProductModal from './components/ProductModal.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    CartOffcanvas,
    Footer,
    FilterOffcanvas,
    ProductModal,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
