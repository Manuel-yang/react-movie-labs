let movies;
let Credits;
let CurActor;
let CombinedCredits;

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


describe("The actor details page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env( "TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    )
    .its("body")
    .then((response) => {
      movies = response.results
    });
  })

  beforeEach(() => {
    cy.visit("/");
  });


  describe("displays the actor name", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      )
      .its("body")
      .then((res) => {
        Credits = res.cast.slice(0, 9)
      })
    })

    beforeEach(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/${Credits[1].id}?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      )
      .its("body")
      .then((res) => {
        CurActor = res
      })

      
      cy.request(
        `https://api.themoviedb.org/3/person/${Credits[1].id}/combined_credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      )
      .its("body")
      .then((res) => {
        CombinedCredits = res
      })
      cy.visit(`/actor/${Credits[1].id}`)
    })

    it("displays the actor profile site", () => {
      console.log(CurActor)
      cy.get('#actorProfileSite')
      .within(() => {
        cy.get("p").contains("Personal Info")
        cy.get("p").contains("Know For")
        cy.get("p").contains("Known Credits")
        cy.get("p").contains("Gender")
        cy.get("p").contains("Birthday")
        cy.get("p").contains("Place of Birth")
        cy.get("p").contains("Also Known As")
        
        let curActor = CurActor
        cy.get("p").contains(curActor.known_for_department)
        cy.get("p").contains(curActor.popularity)
        cy.get("p").contains(curActor.birthday)
        cy.get("p").contains(curActor.place_of_birth)
        curActor.also_known_as.forEach((item) => {
          cy.get("p").contains(item)
        })
      })
    })

    it("displays the actor name and biography", () => {
      let curActor = CurActor
      cy.get('p').contains(curActor.name)
      cy.get('p').contains("Biography")
      cy.get('p').contains(formatNumber(curActor.biography))
    })

    it("displays the movies that actor involved", () => {
      let combinedCredits = CombinedCredits.cast.slice(0, 9)
      console.log(combinedCredits)
      cy.get("#moviesBar").within(() => {
        cy.get(".css-e53awj-MuiStack-root").each(($card, index) => {
          cy.wrap($card).contains(combinedCredits[index].character)
        })
      })
    })
  })
})