import Store from '../../src/store';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

const store = Store;

describe('test api endpoints', () => {
  test('get male products', async () => {
    const res = await axios.get(`${BASE_URL}/products/male`);
    store.commit('setData', res.data);
    expect(store.state.data[1].sex).toEqual('Male');
    expect(store.state.data[0].sex).not.toEqual('Female');
  });

  test('get female products', async () => {
    const res = await axios.get(`${BASE_URL}/products/female`);
    store.commit('setData', res.data);
    expect(store.state.data[1].sex).toEqual('Female');
    expect(store.state.data[0].sex).not.toEqual('Male');
  });

  test('get product in cart by article nr', async () => {
    const res = await axios.post(`${BASE_URL}/products`, { products: [8843133, 6674567] });
    store.commit('setInitialCart', res.data);
    expect(store.state.cart[0].article_nr).toBe(8843133);
    expect(store.state.cart[1].article_nr).toBe(6674567);
    expect(store.state.cart.length).toBe(2);
  });
});

describe('test sort mechanism', () => {
  test('ascending price', () => {
    store.commit('sortArticles', 'Lowest price');
    expect(store.state.data[0].price <= store.state.data[store.state.data.length - 1].price).toBeTruthy();
  });

  test('descending price', () => {
    store.commit('sortArticles', 'Highest price');
    expect(store.state.data[0].price >= store.state.data[store.state.data.length - 1].price).toBeTruthy();
  });

  test('ascending letter', () => {
    store.commit('sortArticles', 'Name A-Z');
    expect(store.state.data[0].title <= store.state.data[store.state.data.length - 1].title).toBeTruthy();
  });

  test('descending letter', () => {
    store.commit('sortArticles', 'Name Z-A');
    expect(store.state.data[0].title >= store.state.data[store.state.data.length - 1].title).toBeTruthy();
  });
});

describe('test filter mechanism', () => {
  test('by size', () => {
    store.commit('filterBySize', 's');
    expect(store.state.selectedSize).toEqual(['s']);
    expect(store.getters.getDisplayedProducts.map((item) => item.s === 1)).not.toContain(false);

    store.commit('filterBySize', 'm');
    expect(store.state.selectedSize).toEqual(['s', 'm']);
    expect(store.getters.getDisplayedProducts.map((item) => item.s === 1 || item.m === 1)).not.toContain(false);

    store.commit('filterBySize', 's');
    expect(store.state.selectedSize).toEqual(['m']);
    expect(store.getters.getDisplayedProducts.map((item) => item.m === 1)).not.toContain(false);

    store.commit('filterBySize', 'm');
    expect(store.state.selectedSize).toEqual([]);
  });

  test('by category', () => {
    store.commit('filterByCategory', 'Tights');
    expect(store.state.selectedCategory).toEqual(['Tights']);
    expect(store.getters.getDisplayedProducts.map((item) => item.category === 'Tights')).not.toContain(false);

    store.commit('filterByCategory', 'T-Shirt');
    expect(store.state.selectedCategory).toEqual(['Tights', 'T-Shirt']);
    expect(
      store.getters.getDisplayedProducts.map((item) => item.category === 'Tights' || item.category === 'T-Shirt')
    ).not.toContain(false);

    store.commit('filterByCategory', 'Tights');
    expect(store.state.selectedCategory).toEqual(['T-Shirt']);
    expect(
      store.getters.getDisplayedProducts.map((item) => item.category !== 'Tights' && item.category === 'T-Shirt')
    ).not.toContain(false);

    store.commit('filterByCategory', 'T-Shirt');
    expect(store.state.selectedCategory).toEqual([]);
  });

  test('mutiple variables combined', () => {
    store.commit('filterBySize', 'm');
    store.commit('filterByBrand', 'NIKE');
    store.commit('filterByBrand', 'ICIW');
    store.commit('filterByColor', 'black');
    store.commit('filterByColor', 'yellow');
    expect(
      store.getters.getDisplayedProducts.map(
        (item) =>
          item.m === 1 &&
          (item.brand === 'NIKE' || item.brand === 'ICIW') &&
          (item.color === 'black' || item.color === 'yellow')
      )
    ).not.toContain(false);
  });
});

describe('test cart mechanism', () => {
  test('add to cart diffrent products', () => {
    store.commit('setInitialCart', []);
    store.commit('setModal', store.state.data[0]);
    store.commit('setSelectedSize', 'm');
    store.commit('addToCart');
    expect(store.state.cart[0].title).toEqual(store.state.data[0].title);
    expect(store.state.cart[0].amount).toBe(1);
    expect(store.state.cart[0].selectedSize).toEqual('m');
    expect(store.state.cart.length).toBe(1);

    store.commit('setModal', store.state.data[1]);
    store.commit('setSelectedSize', 'l');
    store.commit('addToCart');
    expect(store.state.cart[1].title).toEqual(store.state.data[1].title);
    expect(store.state.cart[0].amount).toBe(1);
    expect(store.state.cart[1].selectedSize).toEqual('l');
    expect(store.state.cart.length).toBe(2);
  });

  test('add to cart existing product samt size', () => {
    store.commit('setModal', store.state.data[0]);
    store.commit('setSelectedSize', 'm');
    store.commit('addToCart');
    expect(store.state.cart[0].amount).toBe(2);
    expect(store.state.cart.length).toBe(2);
  });

  test('add to cart existing product diffrent size', () => {
    store.commit('setModal', store.state.data[0]);
    store.commit('setSelectedSize', 'l');
    store.commit('addToCart');
    expect(store.state.cart[0].amount).toBe(2);
    expect(store.state.cart.length).toBe(3);
    expect(store.state.cart[2].title).toEqual(store.state.data[0].title);
    expect(store.state.cart[2].selectedSize).toEqual('l');
    expect(store.state.cart[2].amount).toBe(1);
  });

  test('increment product amount in cart', () => {
    store.commit('incrementItemInCart', store.state.cart[0]);
    expect(store.state.cart[0].amount).toBe(3);
  });

  test('decrement product amount in cart', () => {
    store.commit('decrementItemInCart', store.state.cart[0]);
    expect(store.state.cart[0].amount).toBe(2);
    store.commit('decrementItemInCart', store.state.cart[0]);
    expect(store.state.cart[0].amount).toBe(1);
    store.commit('decrementItemInCart', store.state.cart[0]);
    expect(store.state.cart.length).toBe(2);
  });
});

//npm run test:unit
