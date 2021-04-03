describe("Test simples", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });
  it("Login - fail", () => {
    cy.get("#username")
      .type("incorrectUser.holt@reqres.in")
      .should("have.value", "incorrectUser.holt@reqres.in");
    cy.get("#password")
      .type("inconrrectPassword")
      .should("have.value", "inconrrectPassword");
    cy.get(".ant-btn > span").click();
    cy.get(".ant-result.ant-result-error").should("exist");
  });
  it("Login & GetUserList - success", () => {
    cy.get("#username")
      .type("eve.holt@reqres.in")
      .should("have.value", "eve.holt@reqres.in");
    cy.get("#password").type("cityslicka").should("have.value", "cityslicka");
    cy.get(".ant-btn > span").click();
    cy.get(".sc-pVTma").should("exist");
  });
  it("UserDetailsView - success", () => {
    cy.get("[href='/user/1'] > .ant-card > .ant-card-cover > img").click();
    cy.get(".ant-card-cover > img").should("exist");
  });
  it("UserDetailsView - delete user", () => {
    cy.get("[href='/user/1'] > .ant-card > .ant-card-cover > img").click();
    cy.get(".ant-card-cover > img").should("exist");
    cy.get(".ant-btn-secondary").click();
    cy.get(".ant-result").should("exist");
    cy.get(".ant-result-title").contains("User deleted");
  });
  it("UserDetailsView - edit user", () => {
    cy.get("[href='/user/1'] > .ant-card > .ant-card-cover > img").click();
    cy.get(".ant-card-cover > img").should("exist");
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-form").should("exist");
  });
  it("UserDetailsView - edit user success", () => {
    cy.get("[href='/user/1'] > .ant-card > .ant-card-cover > img").click();
    cy.get(".ant-card-cover > img").should("exist");
    cy.get(".ant-btn-primary > span").click();
    cy.get(".ant-form").should("exist");
    cy.get("#first_name")
      .type("first_name_blablabla")
      .should("have.value", "first_name_blablabla");
    cy.get("#last_name")
      .type("last_name_blablabla")
      .should("have.value", "last_name_blablabla");
    cy.get("#email")
      .type("email@email.com")
      .should("have.value", "email@email.com");
    cy.get(".sc-fotPbf > .ant-btn-primary").click();
    cy.get(".ant-result-icon > .anticon > svg > path").should("exist");
    cy.get(".ant-card-meta-description").contains("email@email.com");
  });
  it("UserDetailsView - hide from", () => {
    cy.get("[href='/user/1'] > .ant-card > .ant-card-cover > img").click();
    cy.get(".ant-card-cover > img").should("exist");
    cy.get(".ant-btn-primary > span").click();
    cy.get(".sc-fotPbf > .ant-btn-secondary").click();
    cy.get(".ant-form").should("not.exist");
  });
  it("Logout - success", () => {
    cy.get("#logout-cypress").click();
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("not.exist");
  });
});
