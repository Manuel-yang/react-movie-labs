const username = "asdfchgjasd"
const email = "asdfld@gmail.com"
const  password = "yangyimeng1"
describe("Test for log in and sign up", () => {
  beforeEach(() => {
    cy.visit("/")
  })



  describe("Sign up", () => {
    it("displays the error when the email is invalid", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Sign up").click()
      cy.get("#username4SignUp").type("YanAemons")
      cy.get("#email4SignUp").type("test")
      cy.get("#password4SignUp").type("yangyimeng1")
      cy.get("button").contains("Subscribe").click()
      cy.get(".MuiAlert-message").contains("Please input valid email address")
    })

    it("displays the error when the password is invalid", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Sign up").click()
      cy.get("#username4SignUp").type("YanAemons")
      cy.get("#email4SignUp").type("test@gmail.com")
      cy.get("#password4SignUp").type("yangyimeng")
      cy.get("button").contains("Subscribe").click()
      cy.get(".MuiAlert-message").contains("Password are at least 5 characters long and contain at least one number and one letter")
    })
  })

  describe("Login", () => {
    it("frontend should return error after inputing invalid username", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Login").click()
      cy.get("#username4Login").type(username+"das")
      cy.get("#password4Login").type(password+"adsf")
      cy.get("button").contains("Subscribe").click()
      cy.get(".MuiAlert-message").contains("Authentication failed. User not found.")
    })

    it("frontend should return error after inputing invalid username", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Login").click()
      cy.get("#username4Login").type("YanAemons")
      cy.get("#password4Login").type(password+"adsf")
      cy.get("button").contains("Subscribe").click()
      cy.get(".MuiAlert-message").contains("Authentication failed. Wrong password.")
    })

    it("frontend should store user id and user token in local storage after login", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Sign up").click()
      cy.get("#username4SignUp").type(username)
      cy.get("#email4SignUp").type(email)
      cy.get("#password4SignUp").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Login").click()
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click().should(() => {``
        expect(localStorage.getItem("userId")).not.to.be.null
        expect(localStorage.getItem("userToken")).not.to.be.null
      })
      cy.get("p").contains(username)
    })
  })

  describe("Log out", () => {
    it("local storage should be cleared after logging out", () => {
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Login").click()
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Log out").click().should(() => {
        expect(localStorage.getItem("userId")).to.be.null
        expect(localStorage.getItem("userToken")).to.be.null
      })
    })
  })
})