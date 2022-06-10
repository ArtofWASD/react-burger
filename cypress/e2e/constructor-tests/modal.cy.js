context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.intercept('GET', '/ingredients', []).as('getIngredient')

    })
    
    it('Open ingridient modal window', () => {
      cy.get('.ingredient-item').first().click()
    })
})