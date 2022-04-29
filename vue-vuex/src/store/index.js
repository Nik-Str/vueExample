import { createStore } from 'vuex';
//modules
import counterStore from './counterStore';
import fetchStore from './fetchStore';
import helperStore from './helperStore';

const store = createStore({
  //Used for break up the store in smaler pieces
  modules: {
    counter: counterStore,
    fetcher: fetchStore,
    helper: helperStore,
  },
});

export default store;

// state() {
//   return {
//   };
// },
// mutations: {}, Mutations CANT be async
// actions: {}, Action CAN by async
// getters: {} //Computed properties for stores
