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
      <SupportBtn />
      <SupportWindow />
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
import SupportBtn from './components/SupportBtn.vue';
import SupportWindow from './components/SupportWindow.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    CartOffcanvas,
    Footer,
    FilterOffcanvas,
    ProductModal,
    SupportBtn,
    SupportWindow,
  },
  mounted() {
    this.$store.dispatch('getFavourites');
    this.$store.dispatch('getCart');
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

.modal {
  z-index: 1045 !important;
}
.modal-backdrop {
  z-index: 1044 !important;
}

.offcanvas {
  z-index: 1050 !important;
}

.offcanvas-backdrop {
  z-index: 1049 !important;
}
</style>
