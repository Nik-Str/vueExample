const store = {
  state() {
    return {
      data: [],
      isLoading: false,
      isError: null,
    };
  },
  mutations: {
    setLoading(state) {
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
    getData(state, payload) {
      state.commit('setLoading');
      fetch(`https://hn.algolia.com/api/v1/search?query=${payload}`)
        .then((res) => res.json())
        .then((res) => {
          state.commit('setData', res.hits);
        })
        .catch((err) => {
          state.commit('setError', err);
        });
    },
  },
  getters: {
    limit5(state) {
      return state.data.slice(0, 5);
    },
    limit10(state) {
      return state.data.slice(0, 10);
    },
  },
};

export default store;
