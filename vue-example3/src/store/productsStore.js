const BASE_URL = 'http://localhost:3000';

const store = {
  state() {
    return {
      data: [],
      isLoading: false,
      isError: null,
      isShowing: [],
    };
  },
  mutations: {
    setLoading(state) {
      state.isShowing = [];
      state.data = [];
      state.isLoading = true;
      state.isError = null;
    },
    setData(state, payload) {
      state.data = payload;
      state.isLoading = false;
      state.isError = null;
    },
    setError(state, payload) {
      state.data = [];
      state.isLoading = false;
      state.isError = payload;
    },
  },
  actions: {
    getProducts(state, payload) {
      state.commit('setLoading');

      fetch(`${BASE_URL}/products/${payload}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => state.commit('setData', res))
        .catch((err) => state.commit('setError', err.message));
    },
  },
  getters: {},
};

export default store;
