//npx cypress run
describe('test favorite mechanism', () => {
  it('add product to favourite', () => {
    cy.visit('http://localhost:8080/male');
    cy.wait(3000);
    cy.get('.card').its('length').should('eq', 10);
    cy.get('.container > .grid > .row').find('i').eq(0).click();
    cy.get('.container > .grid > .row').find('i').eq(1).click();
    cy.visit('http://localhost:8080/female');
    cy.wait(3000);
    cy.get('.card').its('length').should('eq', 10);
    cy.get('.container > .grid > .row').find('i').eq(0).click();
    cy.get('.container > .grid > .row').find('i').eq(1).click();
    cy.visit('http://localhost:8080/favourites');
    cy.wait(3000);
    cy.get('.card').its('length').should('eq', 4);
    cy.get('.container > .grid > .row').find('i').eq(0).click();
    cy.get('.card').its('length').should('eq', 3);
    cy.reload();
    cy.wait(3000);
    cy.get('.card').its('length').should('eq', 3);
    cy.get('*[class^="btn btn-link"]').click(); //find any class that start with
    cy.get('.container > .grid > .row').should('be.empty');
  });
});

describe('test cart mechanism', () => {
  it('add products to cart', () => {
    cy.visit('http://localhost:8080/male');
    cy.wait(3000);
    cy.get('.card').eq(0).find('img').click();
    cy.get('.modal-body').find('h5').should('have.text', 'Training Tights');
    cy.get('select').select('m', { force: true }).invoke('val').should('eq', 'm');
    cy.get('.modal-footer').find('button').click();
    cy.get('#offcanvasRight').find('.testClassContainer').children().its('length').should('eq', 1);
    cy.get('#offcanvasRight').find('.testClassText').eq(0).children().eq(0).should('have.text', 'Training Tights');
    cy.get('#offcanvasRight').find('.testClassText').eq(0).children().eq(1).should('have.text', 'M');
    cy.get('#offcanvasRight').find('.btn-close').click();
    cy.get('.modal-header').find('.btn-close').click();

    //Add second product
    cy.visit('http://localhost:8080/female');
    cy.wait(3000);
    cy.get('.card').eq(0).find('img').click();
    cy.get('.modal-body').find('h5').should('have.text', 'Scrunch Seamless Biker');
    cy.get('select').select('l', { force: true }).invoke('val').should('eq', 'l');
    cy.get('.modal-footer').find('button').click();
    cy.get('#offcanvasRight').find('.testClassContainer').children().its('length').should('eq', 2);
    cy.get('#offcanvasRight')
      .find('.testClassText')
      .eq(1)
      .children()
      .eq(0)
      .should('have.text', 'Scrunch Seamless Biker');
    cy.get('#offcanvasRight').find('.testClassText').eq(1).children().eq(1).should('have.text', 'L');
    cy.get('#offcanvasRight').find('.btn-close').click();
    cy.get('.modal-header').find('.btn-close').click();

    //Remove item from cart
    cy.get('.navbar').find('i').eq(1).click();
    cy.get('#offcanvasRight').should('be.visible');
    cy.get('#offcanvasRight').find('h4').should('have.text', 'Cart');
    cy.get('#offcanvasRight').find('.testClassContainer').children().its('length').should('eq', 2);
    cy.get('.testClassContainer').children().eq(0).find('i').eq(0).click();
    cy.get('#offcanvasRight').find('.testClassContainer').children().its('length').should('eq', 1);
    cy.get('.testClassContainer').children().eq(0).find('i').eq(0).click();
    cy.get('.testClassContainer').should('be.empty');
  });
});

describe('filter & sort mechanism', () => {
  it('sort', () => {
    cy.visit('http://localhost:8080/male');
    cy.wait(3000);
    cy.get('.card').eq(0).find('.card-body').children().eq(1).children().eq(1).should('have.text', '65 €');
    cy.get('button').get('[data-bs-target="#offcanvasLeft"]').click();
    cy.get('#offcanvasLeft').find('.form-check-input').eq(2).click();
    cy.get('#offcanvasLeft').find('.btn-close').click();
    cy.get('.card').eq(0).find('.card-body').children().eq(1).children().eq(1).should('have.text', '22 €');
  });

  it('filter', () => {
    cy.visit('http://localhost:8080/male');
    cy.wait(3000);
    cy.get('.card').eq(0).find('.card-body').children().eq(0).children().eq(0).should('have.text', 'Training Tights');
    cy.get('button').get('[data-bs-target="#offcanvasLeft"]').click();
    cy.get('#offcanvasLeft').find('.form-check-input').eq(5).click();
    cy.get('#offcanvasLeft').find('.btn-close').click();
    cy.get('.card')
      .eq(0)
      .find('.card-body')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('have.text', 'Ultimate Training Hoodie');
  });
});
