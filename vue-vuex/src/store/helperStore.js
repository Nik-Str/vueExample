const store = {
  state() {
    return {
      helpState: 'So much help to user!',
    };
  },
  mutations: {
    callHelp(state) {
      state.helpState = 'Some call 911 ?';
    },
    setData(state, payload) {
      state.helpState = payload[0].title;
    },
  },
  actions: {
    async someHelp(state, payload) {
      const data = await fetch(`https://hn.algolia.com/api/v1/search?query=${payload}`);
      const response = await data.json();
      state.commit('setData', response.hits);
    },
  },
  getters: {
    helpSlice(state) {
      return state.helpState.slice(0, 10);
    },
  },
};

export default store;
