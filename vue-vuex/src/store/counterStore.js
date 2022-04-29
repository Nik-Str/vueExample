const store = {
  state() {
    return {
      count: 0,
    };
  },
  //Mutations CANT be async
  mutations: {
    increment(state, payload) {
      state.count = state.count + payload;
    },
    decrement(state, payload) {
      state.count = state.count - payload;
    },
  },
  //Computed properties for stores
  getters: {
    multi: (state) => (number) => {
      return state.count * number;
    },
  },
};

export default store;
