import SiteHeader from '../../src/components/siteHeader'
import { BrowserRouter } from "react-router-dom";

describe('siteHeader.cy.js', () => {
  it('contain logo name', () => {
    cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
    cy.get(".css-p7bec2-MuiTypography-root").contains('YanAemons')
  })

  it("can input info in search bar", () => {
    cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
    cy.get("input").type("Black adam")
  })

  it("click home button", () => {
        cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
    cy.get("button")
      .contains("Home")
      .click()
  })

  it("click favourites button", () => {
    cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
    cy.get("button").contains("Favourites").click();
  })

  it("click upcoming button", () => {
    cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
    cy.get("button").contains("Upcoming").click();
  })
})