import { createStore } from 'vuex';
import productsStore from './productsStore';

export default createStore({
  modules: {
    products: productsStore,
  },
});
