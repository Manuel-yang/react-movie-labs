let upcoming;

describe("Upcoming tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        upcoming = response.results;
      });
  })


  describe("The upcoming page", () => {
    beforeEach(() => {
      cy.visit("/movies/upcoming")
    })

    it("displays the page header and 20 movies", () => {
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    })

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(upcoming[index].title);
      });
    });
  })
})