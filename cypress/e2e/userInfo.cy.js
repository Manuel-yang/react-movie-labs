const username = "YanAemons4"
const email = "asdf@qq.com"
const  password = "yangyimeng1"
describe("Test for account info page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Login").click()
  })

  describe("account page", () => {
    it("should have users email and username", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click().then(() => {
        cy.get("div").contains(username)
        cy.get("#userEmail").contains(email)
      })
    })
    it("user name should be changed after updating", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get("#usernameInput").type("YanAemons3")
      cy.get("button").contains("Submit").click().then(() => {
        cy.visit("/")
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.get("li").contains("Log out").click()
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.get("li").contains("Login").click()
        cy.get("#username4Login").type("YanAemons3")
        cy.get("#password4Login").type(password)
        cy.get("button").contains("Subscribe").click()
        cy.get("div").contains("YanAemons3")
      })

      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get("#usernameInput").type("YanAemons4")
      cy.get("button").contains("Submit").click()
   })

   it("user email should be changed after updating", () => {
    cy.get("#username4Login").type(username)
    cy.get("#password4Login").type(password)
    cy.get("button").contains("Subscribe").click()
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Account info").click()
    cy.get("#emailInput").type("aslifasdfasd@qq.com")
    cy.get("button").contains("Submit").click().then(() => {
      cy.visit("/")
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Log out").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Login").click()
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get("#userEmail").contains("aslifasdfasd@qq.com")
    })
    cy.get("#emailInput").type(email)
    cy.get("button").contains("Submit").click()

 })

  })

})
  