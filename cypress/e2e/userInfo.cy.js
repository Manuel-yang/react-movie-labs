const username = "YanAemons4"
const email = "asdf@qq.com"
const  password = "yangyimeng1"
let movies
let id
let similarMovies
describe("Test for account info page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Login").click()
  })

  describe("account info block", () => {
    it("should have users email and username", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click().then(() => {
        cy.get("div").contains(username)
        cy.wait(1000)
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
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.get("li").contains("Account info").click()
        cy.get("#usernameInput").type("YanAemons4")
        cy.get("button").contains("Submit").click()
        cy.wait(1000)
      })


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
        cy.get("#emailInput").type(email)
        cy.get("button").contains("Submit").click()
        cy.wait(1000)
      })
  })


 it("password should be changed after updating", () => {
  cy.get("#username4Login").type(username)
  cy.get("#password4Login").type(password)
  cy.get("button").contains("Subscribe").click()
  cy.get('[data-testid="AccountCircleIcon"]').click()
  cy.get("li").contains("Account info").click()
  cy.get("#passwordInput").type("yangyimeng2")
  cy.get("button").contains("Submit").click().then(() => {
    cy.visit("/")
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Log out").click()
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Login").click()
    cy.get("#username4Login").type(username)
    cy.get("#password4Login").type("yangyimeng2")
    cy.get("button").contains("Subscribe").click()
    cy.get('[data-testid="AccountCircleIcon"]').click()
    cy.get("li").contains("Account info").click()
    cy.get("#passwordInput").type("yangyimeng1")
    cy.get("button").contains("Submit").click()
    cy.wait(1000)
  })

})




})

  describe("Genres", () => {
    it("user profile site shoud have genre chips after choosing", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get(".PrivateSwitchBase-input").eq(0).click()
      cy.get(".PrivateSwitchBase-input").eq(1).click()
      cy.get("button").contains("Submit").click().then(() => {
        cy.get(".MuiChip-label").contains("Action")
        cy.get(".MuiChip-label").contains("Adventure")
      })
      cy.get("button").contains("Reset").click()
      cy.wait(1000)
    })
  })

  describe("Favourite movies", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          movies = response.results;
          id = movies[1].id
        });
    });
    it("should have favourite movies after choosing", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get("#favMovies").find(".MuiTypography-root").contains(movies[1].title)
    })
  })


  describe("Recommend movies", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          movies = response.results;
          cy.request(
            `https://api.themoviedb.org/3/movie/${movies[1].id}/similar?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1"`
          )
          .its("body")
          .then((response) => {
            similarMovies = response.results
          })
        });
    });
    it("should have favourite movies after choosing", () => {
      cy.get("#username4Login").type(username)
      cy.get("#password4Login").type(password)
      cy.get("button").contains("Subscribe").click()
      cy.get('[data-testid="AccountCircleIcon"]').click()
      cy.get("li").contains("Account info").click()
      cy.get("#similarMovies").find(".MuiTypography-root").contains(similarMovies[0].title)
    })
  })
})
  