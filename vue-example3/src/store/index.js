import axios from 'axios';
import { createStore } from 'vuex';
const BASE_URL = 'http://localhost:3000';

export default createStore({
  state() {
    return {
      data: [],
      isLoading: false,
      isError: null,
      modal: {},
      modalSelectedSize: 'null',
      allSorts: ['Name A-Z', 'Name Z-A', 'Lowest price', 'Highest price'],
      allCategories: [],
      allColors: [],
      allBrands: [],
      allSizes: ['s', 'm', 'l', 'xl'],
      base_url: process.env.VUE_APP_BASE_URL,
      selectedCategory: [],
      selectedBrand: [],
      selectedSize: [],
      selectedColor: [],
      favourites: [],
      cart: [],
      displaySupport: false,
      webSocket: null,
      supportChat: [],
      supportTicketId: null,
      supportId: null,
      supportList: [],
      isLoadingSupportUpdate: false,
      clientHasNewMsg: false,
    };
  },
  mutations: {
    setLoading(state) {
      state.data = [];
      state.data = [];
      state.isLoading = true;
      state.isError = null;
    },
    setData(state, payload) {
      //Init state after data fetch
      state.data = payload;
      state.isLoading = false;
      state.isError = null;

      let categories = [];
      let colors = [];
      let brands = [];
      //Get values for filter mechanism
      for (let i = 0; i < state.data.length; i++) {
        if (!categories.some((item) => item === state.data[i].category)) {
          categories.push(state.data[i].category);
        }
        if (!colors.some((item) => item === state.data[i].color)) {
          colors.push(state.data[i].color);
        }
        if (!brands.some((item) => item === state.data[i].brand)) {
          brands.push(state.data[i].brand);
        }
      }
      //Init state for filters
      state.allCategories = categories;
      state.allColors = colors;
      state.allBrands = brands;
    },
    setError(state, payload) {
      state.data = [];
      state.isLoading = false;
      state.isError = payload;
    },
    setModal(state, payload) {
      state.modal = payload;
    },
    setSelectedSize(state, payload) {
      state.modalSelectedSize = payload;
    },
    sortArticles(state, payload) {
      switch (payload) {
        case 'Name A-Z':
          state.data = state.data.sort((a, b) => (a.title < b.title ? -1 : 1));
          break;
        case 'Name Z-A':
          state.data = state.data.sort((a, b) => (a.title > b.title ? -1 : 1));
          break;
        case 'Lowest price':
          state.data = state.data.sort((a, b) => (a.price < b.price ? -1 : 1));
          break;
        case 'Highest price':
          state.data = state.data.sort((a, b) => (a.price > b.price ? -1 : 1));
          break;
        default:
          break;
      }
    },
    filterBySize(state, payload) {
      if (state.selectedSize.some((item) => item === payload)) {
        state.selectedSize = state.selectedSize.filter((item) => item !== payload);
      } else {
        state.selectedSize = [...state.selectedSize, payload];
      }
    },
    filterByCategory(state, payload) {
      if (state.selectedCategory.some((item) => item === payload)) {
        state.selectedCategory = state.selectedCategory.filter((item) => item !== payload);
      } else {
        state.selectedCategory = [...state.selectedCategory, payload];
      }
    },
    filterByBrand(state, payload) {
      if (state.selectedBrand.some((item) => item === payload)) {
        state.selectedBrand = state.selectedBrand.filter((item) => item !== payload);
      } else {
        state.selectedBrand = [...state.selectedBrand, payload];
      }
    },
    filterByColor(state, payload) {
      if (state.selectedColor.some((item) => item === payload)) {
        state.selectedColor = state.selectedColor.filter((item) => item !== payload);
      } else {
        state.selectedColor = [...state.selectedColor, payload];
      }
    },
    setInitialFavourites(state, payload) {
      state.favourites = payload;
    },
    addToFavourites(state, payload) {
      if (state.favourites.some((item) => item.article_nr === payload.article_nr)) {
        state.favourites = state.favourites.filter((item) => item.article_nr !== payload.article_nr);
      } else {
        state.favourites = [...state.favourites, payload];
      }
      if (state.favourites.length >= 1) {
        localStorage.setItem('favourites', JSON.stringify(state.favourites.map((item) => item.article_nr)));
      } else {
        localStorage.removeItem('favourites');
      }
    },
    removeAllFromFavourites(state) {
      state.favourites = [];
      localStorage.removeItem('favourites');
    },
    addToCart(state) {
      //Controll if item added already exist in cart
      if (
        state.cart.some(
          (item) => item.article_nr === state.modal.article_nr && item.selectedSize === state.modalSelectedSize
        )
      ) {
        // Increment existing item in cart
        state.cart = state.cart.map((item) => {
          if (item.article_nr === state.modal.article_nr && item.selectedSize === state.modalSelectedSize) {
            return { ...item, total: item.total + state.modal.price, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
        //Add new item in cart
      } else {
        state.cart = [
          ...state.cart,
          { ...state.modal, total: state.modal.price, amount: 1, selectedSize: state.modalSelectedSize },
        ];
      }
      // Update semipersistent state for cart in localstorage
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.cart.map((item) => {
            return { article: item.article_nr, amount: item.amount, size: item.selectedSize };
          })
        )
      );
    },
    incrementItemInCart(state, payload) {
      state.cart = state.cart.map((item) => {
        if (item === payload) {
          return { ...item, total: item.total + item.price, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.cart.map((item) => {
            return { article: item.article_nr, amount: item.amount, size: item.selectedSize };
          })
        )
      );
    },
    decrementItemInCart(state, payload) {
      if (payload.amount > 1) {
        state.cart = state.cart.map((item) => {
          if (item === payload) {
            return { ...item, total: item.total - item.price, amount: item.amount - 1 };
          } else {
            return item;
          }
        });
      } else {
        state.cart = state.cart.filter((item) => item !== payload);
      }
      if (state.cart.length >= 1) {
        localStorage.setItem(
          'cart',
          JSON.stringify(
            state.cart.map((item) => {
              return { article: item.article_nr, amount: item.amount, size: item.selectedSize };
            })
          )
        );
      } else {
        localStorage.removeItem('cart');
      }
    },
    setInitialCart(state, payload) {
      state.cart = payload;
    },
    setDisplaySupport(state) {
      state.displaySupport = !state.displaySupport;
    },
    initSupportChat(state, payload) {
      if (!state.webSocket) {
        //Init new websocket in state
        state.webSocket = new WebSocket(`ws://localhost:3000/${payload}`);

        //On new message
        state.webSocket.addEventListener('message', (response) => {
          const support = JSON.parse(response.data);
          //Display new msg to client
          if (!state.displaySupport) state.clientHasNewMsg = true;

          //Init client and support websocket states
          if (support.ticketId && !state.supportTicketId) {
            state.supportTicketId = support.ticketId;
          } else if (support.supportId && state.supportTicketId) {
            if (!state.supportId) state.supportId = support.ticketId;
            if (
              support.ticketId === state.supportId ||
              support.ticketId.slice(-7) === 'support' ||
              state.supportId.slice(-7) === 'support'
            )
              state.supportChat = [...state.supportChat, support];
          } else {
            state.supportChat = [...state.supportChat, support];
          }
        });

        //On support-ticket close
        state.webSocket.addEventListener('close', () => {
          //Reinit websocket and ticket states
          state.webSocket.close();
          state.webSocket = null;
          state.supportChat = [];
          state.supportTicketId = null;
          state.supportId = null;
          state.displaySupport = false;
        });
      }
    },
    setSupportId(state, payload) {
      state.supportId = payload;
    },
    sendSupportTicket(state, payload) {
      state.webSocket.send(
        JSON.stringify({
          msg: payload.msg,
          client: payload.client,
          ticketId: state.supportTicketId,
          supportId: state.supportId,
        })
      );
    },
    setSupportList(state, payload) {
      state.supportList = payload;
    },
    setInitChat(state, payload) {
      state.supportChat = payload;
    },
    setIsLoadingSupportUpdate(state) {
      state.isLoadingSupportUpdate = !state.isLoadingSupportUpdate;
    },
    setClientHasNewMsg(state) {
      state.clientHasNewMsg = false;
    },
    resetFilters(state) {
      state.selectedCategory = [];
      state.selectedBrand = [];
      state.selectedSize = [];
      state.selectedColor = [];
    },
  },
  actions: {
    getProducts(state, payload) {
      state.commit('setLoading');
      axios
        .get(`${BASE_URL}/products/${payload}`)
        .then((res) => state.commit('setData', res.data))
        .catch((err) => state.commit('setError', err.message));
    },
    getFavourites(state) {
      const storage = JSON.parse(localStorage.getItem('favourites'));
      if (storage) {
        axios
          .post(`${BASE_URL}/products`, { products: storage })
          .then((res) => state.commit('setInitialFavourites', res.data))
          .catch((err) => state.commit('setError', err.message));
      }
    },
    getCart(state) {
      //Check for previous added cart items in semipersistent storage
      const storage = JSON.parse(localStorage.getItem('cart'));
      if (storage) {
        //Get cart items data from server
        const articles = storage.map((item) => item.article);
        axios
          .post(`${BASE_URL}/products`, { products: articles })
          .then((res) => {
            let cart = [];
            //Reinit previous cart state
            for (let i = 0; i < storage.length; i++) {
              const item = res.data.filter((item) => item.article_nr === storage[i].article);
              cart.push({
                ...item[0],
                amount: storage[i].amount,
                selectedSize: storage[i].size,
                total: storage[i].amount * item[0].price,
              });
            }
            //Set cart state
            state.commit('setInitialCart', cart);
          })
          .catch((err) => state.commit('setError', err.message));
      }
    },
    getSupportList(state) {
      state.commit('setIsLoadingSupportUpdate');
      axios
        .get(`${BASE_URL}/supportlist`)
        .then((res) => {
          state.commit('setSupportList', res.data);
          state.commit('setIsLoadingSupportUpdate');
        })
        .catch((err) => state.commit('setError', err.message));
    },
    getSupportChat(state, payload) {
      axios
        .post(`${BASE_URL}/supportchat`, JSON.stringify({ id: payload }))
        .then((res) => state.commit('setInitChat', res.data))
        .catch((err) => state.commit('setError', err.message));
    },
    removeSupportChat(state, payload) {
      state.commit('setIsLoadingSupportUpdate');
      axios
        .post(`${BASE_URL}/removesupport`, JSON.stringify({ id: payload }))
        .then(() => {
          state.commit('setInitChat', []);
          state.commit('setSupportId', '');
          state.dispatch('getSupportList');
          state.commit('setIsLoadingSupportUpdate');
        })
        .catch((err) => state.commit('setError', err.message));
    },
  },
  getters: {
    getDisplayedProducts(state) {
      let items = JSON.parse(JSON.stringify(state.data));

      //Filter by category
      if (state.selectedCategory.length >= 1) {
        items = items.filter((item) => state.selectedCategory.includes(item.category));
      }

      //Filter by brand
      if (state.selectedBrand.length >= 1) {
        items = items.filter((item) => state.selectedBrand.includes(item.brand));
      }

      //Filter by size
      if (state.selectedSize.length >= 1) {
        items = items.filter((item) => {
          if (item.s) {
            if (state.selectedSize.includes('s')) return item;
          }
          if (item.m) {
            if (state.selectedSize.includes('m')) return item;
          }
          if (item.l) {
            if (state.selectedSize.includes('l')) return item;
          }
          if (item.xl) {
            if (state.selectedSize.includes('xl')) return item;
          }
        });
      }

      //Filter by color
      if (state.selectedColor.length >= 1) {
        items = items.filter((item) => state.selectedColor.includes(item.color));
      }

      return items;
    },
    getCartAmount(state) {
      let amount = 0;
      for (let i = 0; i < state.cart.length; i++) {
        amount = amount + state.cart[i].amount;
      }
      return amount;
    },
    getCartTotal(state) {
      let total = 0;
      for (let i = 0; i < state.cart.length; i++) {
        total = total + state.cart[i].total;
      }
      return total;
    },
  },
});
