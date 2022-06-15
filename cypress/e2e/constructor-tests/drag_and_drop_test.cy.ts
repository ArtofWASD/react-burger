/* eslint-disable cypress/no-unnecessary-waiting */
context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should drag elements to constructor and delete ingredient from constructor", () => {
    cy.get("#60d3b41abdacab0026a733cb").drag("#constructor_drop_place");
    cy.get("#constructor_drop_place")
      .find(".constructor-element")
      .contains("Биокотлета из марсианской Магнолии ")
      .parent()
      .find(".constructor-element__action")
      .click();
  });
  it("Should the user not be authorized to place an order", () => {
    cy.get("#60d3b41abdacab0026a733c7").drag("#constructor_drop_place");
    cy.get("#60d3b41abdacab0026a733cf").drag("#constructor_drop_place");
    cy.get("#60d3b41abdacab0026a733cb").drag("#constructor_drop_place");
    cy.get("button").contains("Оформить заказ").click();
    cy.get('input[name="email"]').type("Chunl3e666@yandex.ru");
    cy.get('input[name="password"]').type("123");
    cy.get('button[name="submit"]').click().wait(1000);
    cy.get("button").contains("Оформить заказ").click().wait(16000)
    cy.get('.modal_order_title').contains("идентификатор заказа")
  });
});
