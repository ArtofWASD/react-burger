context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Open ingridient modal window and close', () => {
    cy.get('.ingredient-item').first().click()
    cy.get('#close_btn', { timeout: 500 }).should('be.visible')
    cy.get('.property_elem').should('be.visible').contains('Каллории, ккал.')
    cy.get('.property_elem').should('be.visible').contains('Белки, г.')
    cy.get('.property_elem').should('be.visible').contains('Жиры, г.')
    cy.get('.property_elem').should('be.visible').contains('Углеводы, г.')
    cy.get('.ingredient_title').should('be.visible').contains('Краторная булка N-200i')
    cy.get('.ingredient_image').find('img').should('have.attr', 'src')
    cy.get('#close_btn').click()
    cy.get('#close_btn').should('not.exist')
  })

  it('Open ingredient item following direct link', () => {
    cy.visit('/ingredients/60d3b41abdacab0026a733c7')
    cy.get('#close_btn').should('not.exist')
    cy.get('.property_elem').should('be.visible').contains('Каллории, ккал.')
    cy.get('.property_elem').should('be.visible').contains('Белки, г.')
    cy.get('.property_elem').should('be.visible').contains('Жиры, г.')
    cy.get('.property_elem').should('be.visible').contains('Углеводы, г.')
    cy.get('.ingredient_title').should('be.visible').contains('Флюоресцентная булка R2-D3')
    cy.get('.ingredient_image').find('img').should('have.attr', 'src')
  })
})