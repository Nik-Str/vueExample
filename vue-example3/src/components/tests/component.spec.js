//npx cypress open-ct
import { mount } from '@cypress/vue';
import Products from '../Products.vue';
import Store from '../../store';
import CartOffcanvas from '../CartOffcanvas.vue';
import Navbar from '../Navbar.vue';
import ProductModal from '../ProductModal.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const product = [
  { brand: 'ICIW', price: 65, title: 'Training Tights', image_one: '11349_1.webp' },
  { brand: 'ICIW', price: 54, title: 'Ultimate Training Hoodie', image_one: '11943-1.webp' },
  { brand: 'ICIW', price: 58, title: 'Mercury Running Pants', image_one: '11997_1.webp' },
];

describe('test dynamic rendering', () => {
  it('products', () => {
    mount(Products, {
      global: {
        plugins: [Store],
      },
      props: {
        products: product,
      },
    });
    cy.get('.card').its('length').should('eq', 3);
    cy.get('.card').eq(0).find('.card-body').children().eq(0).children().eq(0).should('have.text', 'Training Tights');
    cy.get('.card')
      .eq(1)
      .find('.card-body')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.text', 'Ultimate Training Hoodie');
  });

  it('cart', () => {
    const store = Store;

    store.commit('setModal', product[0]);
    store.commit('setSelectedSize', 'm');
    store.commit('addToCart');
    mount(Navbar, {
      global: {
        plugins: [store],
      },
    });
    mount(CartOffcanvas, {
      global: {
        plugins: [store],
      },
    });
    cy.get('.navbar-toggler').click();
    cy.get('.navbar').find('i').eq(1).click();
    cy.get('#offcanvasRight').find('.testClassText').eq(0).children().eq(0).should('have.text', 'Training Tights');
  });

  it('product modal', () => {
    const store = Store;
    store.commit('setModal', product[0]);

    mount(Products, {
      global: {
        plugins: [store],
      },
      props: {
        products: product,
      },
    });
    mount(ProductModal, {
      global: {
        plugins: [store],
      },
    });
    cy.get('.card').eq(0).find('img').click();
    cy.get('#productModal').find('h5').should('have.text', 'Training Tights');
  });
});
