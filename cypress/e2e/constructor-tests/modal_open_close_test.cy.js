context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Open ingridient modal window and close', () => {
    cy.get('.ingredient-item').first().click()
    cy.get('[id="close_btn"]', { timeout: 500 }).should('be.visible')
    cy.get('[id="close_btn"]').click()
    cy.get('[id="close_btn"]').should('not.exist')
  })
})