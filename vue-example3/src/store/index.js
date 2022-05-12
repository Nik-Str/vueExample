import { createStore } from 'vuex';
const BASE_URL = 'http://localhost:3000';

export default createStore({
  state() {
    return {
      data: [],
      isLoading: false,
      isError: null,
      data: [],
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
      state.data = payload;
      state.isLoading = false;
      state.isError = null;

      let categories = [];
      let colors = [];
      let brands = [];
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
      localStorage.setItem('favourites', JSON.stringify(state.favourites.map((item) => item.article_nr)));
    },
    removeAllFromFavourites(state) {
      state.favourites = [];
      localStorage.removeItem('favourites');
    },
    addToCart(state) {
      if (
        state.cart.some(
          (item) => item.article_nr === state.modal.article_nr && item.selectedSize === state.modalSelectedSize
        )
      ) {
        state.cart = state.cart.map((item) => {
          if (item.article_nr === state.modal.article_nr && item.selectedSize === state.modalSelectedSize) {
            return { ...item, total: item.total + state.modal.price, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
      } else {
        state.cart = [
          ...state.cart,
          { ...state.modal, total: state.modal.price, amount: 1, selectedSize: state.modalSelectedSize },
        ];
      }
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
    getFavourites(state) {
      const storage = JSON.parse(localStorage.getItem('favourites'));
      if (storage) {
        fetch(`${BASE_URL}/products`, {
          method: 'POST',
          body: JSON.stringify({ products: storage }),
        })
          .then((res) => res.json())
          .then((res) => state.commit('setInitialFavourites', res))
          .catch((err) => state.commit('setError', err.message));
      }
    },
    getCart(state) {
      const storage = JSON.parse(localStorage.getItem('cart'));
      if (storage) {
        const articles = storage.map((item) => item.article);
        fetch(`${BASE_URL}/products`, {
          method: 'POST',
          body: JSON.stringify({ products: articles }),
        })
          .then((res) => res.json())
          .then((res) => {
            let cart = [];
            for (let i = 0; i < storage.length; i++) {
              const item = res.filter((item) => item.article_nr === storage[i].article);
              cart.push({
                ...item[0],
                amount: storage[i].amount,
                selectedSize: storage[i].size,
                total: storage[i].amount * item[0].price,
              });
            }
            state.commit('setInitialCart', cart);
          })
          .catch((err) => state.commit('setError', err.message));
      }
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
