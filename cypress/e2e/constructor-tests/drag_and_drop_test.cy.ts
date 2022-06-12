context('Actions', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('should drag bun element to constructor', () => {
      cy.get('[id="60d3b41abdacab0026a733c7"]').drag('[id="constructor_drop_place"]')
    })
})