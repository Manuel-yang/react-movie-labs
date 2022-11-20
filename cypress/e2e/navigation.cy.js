let movies;
let movieId; // Enola Holmes movie id

Cypress.Commands.add('enter', () => {
  cy.get("#searchIcon").click()
})

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });

  describe("use search will navigate to the movie's deatils", () => {
    it("navigates to the movie details page through search", () => {
      cy.get("input").eq(0).type("Black adam").enter()
      cy.url().should("include", `/movies/436270`)
    })
  })

  describe("navigation should navigate to different page", () => {
    it("should navigate to favourite page after click favourite link", () => {
      cy.get("button").contains("Favourites").click()
      cy.url().should("include", `/movies/favorites`)
      cy.get("button").contains("Home").click();
      cy.url().should("include", `/`);
      cy.get("button").contains("Upcoming").click();
      cy.url().should("include", `/upcoming`);
    })
  })
  // describe("The site header", () => {
  //   describe("when the viewport is desktop scale", () => {
  //     it("navigation via the links", () => {
  //       cy.get("button").contains("Favorites").click();
  //       cy.url().should("include", `/favorites`);
  //       cy.get("button").contains("Home").click();
  //       cy.url().should("include", `/`);
  //     });
  //   });
  //   describe(
  //     "when the viewport is a mobile scale",
  //     {
  //       viewportHeight: 896,
  //       viewportWidth: 414,
  //     },
  //     () => {
  //       it("navigation via the dropdown menu", () => {
  //         cy.get("header").find("button").click();
  //         cy.get("li").contains('Favorites').click();
  //         cy.url().should("include", `/favorites`);
  //         cy.get("li").contains('Home').click();
  //         cy.url().should("include", `/`);
  //       });
  //     }
  //   );
  // });
  // describe("From the favourites page to a movie's details", () => {
  //   before(() => {
  //     cy.request(
  //       `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
  //         "TMDB_KEY"
  //       )}&language=en-US&include_adult=false&include_video=false&page=1`
  //     )
  //       .its("body")
  //       .then((response) => {
  //         movies = response.results;
  //       });
  //   });
  //   beforeEach(() => {
  //     cy.visit("/");
  //   });
  
  //   describe("Selecting favourites", () => {
  //     it("selected movie card shows the red heart", () => {
  //       cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
  //       cy.get("button[aria-label='add to favorites']").eq(1).click();
  //       cy.get(".MuiCardHeader-root").eq(1).find("svg");
  //     });
  //   });
  
  //   describe("The favourites page", () => {
  //     beforeEach(() => {
  //       // Select two favourites and navigate to Favourites page
  //       cy.get("button[aria-label='add to favorites']").eq(1).click();
  //       cy.get("button[aria-label='add to favorites']").eq(3).click();
  //       cy.get("button").contains("Favorites").click();
  //     });
  //     it("only the tagged movies are listed", () => {
  //       cy.get(".MuiCardHeader-content").should("have.length", 2);
  //       cy.get(".MuiCardHeader-content")
  //         .eq(0)
  //         .find("p")
  //         .contains(movies[1].title);
  //       cy.get(".MuiCardHeader-content")
  //         .eq(1)
  //         .find("p")
  //         .contains(movies[3].title);
  //       cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
  //     });
  //   });
  // });
  // describe("The forward/backward links", () => {
  //   beforeEach(() => {
  //     cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
  //   });
  //   it("navigates between the movies detail page and the Home page.", () => {
  //     cy.get("svg[data-testid='ArrowBackIcon'").click();
  //     cy.url().should("not.include", `/movies/${movies[0].id}`);
  //     cy.get("svg[data-testid='ArrowForwardIcon'").click();
  //     cy.url().should("include", `/movies/${movies[0].id}`);
  //   });
  // });
});