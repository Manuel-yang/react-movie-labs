let movies; // List of movies from TMDB
let movie; //
let Keywords

function formatNumber (value) {
  if (!value) {
     return 0.00
  }
  var newVal = value.toString()
  var arr = newVal.split('.')
  var intpart = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (arr[1]) {
      return intpart + '.' + arr[1]
  } else {
      return intpart
  }
}

describe("Base tests", () => {
  before(() => {
    // Get the discover movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("The Discover Movies page", () => {
    it("displays the page header and 20 movies", () => {
      cy.get("h2").contains("What is on trending");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies[index].title);
      });
    });
  });
  describe("The movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });

        cy.request(
          `https://api.themoviedb.org/3/movie/${movies[0].id}/keywords?api_key=${Cypress.env("TMDB_KEY")}`
        )
        .its("body")
        .then((res) => {
          Keywords = res
        })
    });
    beforeEach(() => {
      cy.visit(`/movies/${movies[0].id}`);
    });
    it(" displays the movie title, overview and genres and ", () => {
      cy.get("p").contains(movie.title);
      cy.get("p").contains("Overview");
      cy.get("p").contains(movie.overview);
      cy.get("p").contains(movie.release_date)
      cy.get("li")
        .within(() => {
          const genreChipLabels = movie.genres.map((g) => g.name);
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(genreChipLabels[index]);
          });
        });
    });

    it(" displays the movie status, original language, Popularity, Runtime, Revenue, Budge", () => {
      cy.get(".css-e64qdn")
      .within(() => {
        cy.get("p").contains(movie.status)
        cy.get("p").contains(movie.spoken_languages[0].name)
        cy.get("p").contains(formatNumber(movie.revenue));
        cy.get("p").contains(movie.runtime)
        cy.get("p").contains(movie.popularity)
        cy.get("p").contains(formatNumber(movie.budget))
      })
    })

    it(" displays the movie status, original language, Popularity, Runtime, Revenue, Budge", () => {
      cy.get(".css-e64qdn")
      .within(() => {
        cy.get("p").contains(movie.status)
        cy.get("p").contains(movie.spoken_languages[0].name)
        cy.get("p").contains(formatNumber(movie.revenue));
        cy.get("p").contains(movie.runtime)
        cy.get("p").contains(movie.popularity)
        cy.get("p").contains(formatNumber(movie.budget))
      })
    })

    it(" displays the movie keywords", () => {
      cy.get(".css-e64qdn")
      .within(() => {
        cy.get("p").contains("Keywords")
        const keywords = Keywords.keywords
        cy.get("span").each(($card, index) => {
          cy.wrap($card).contains(keywords[index].name)
        })
      })
    })
    
  });
});