import { shallowMount } from '@vue/test-utils';
import Products from '../../src/components/Products.vue';
import store from '../../src/store';

const product = [
  { brand: 'ICIW', price: 65, title: 'Training Tights', image_one: '11349_1.webp' },
  { brand: 'ICIW', price: 54, title: 'Ultimate Training Hoodie', image_one: '11943-1.webp' },
  { brand: 'ICIW', price: 58, title: 'Mercury Running Pants', image_one: '11997_1.webp' },
];

describe('test dynamic rendering', () => {
  test('products', () => {
    const wrapper = shallowMount(Products, {
      global: {
        plugins: [store],
      },
      propsData: {
        products: product,
      },
    });
    expect(wrapper.find('.card')).toBeDefined();
    expect(wrapper.findAll('.card').length).toBe(3);
  });
});
