import SiteHeader from '../../src/components/siteHeader'
import { BrowserRouter } from "react-router-dom";

describe('siteHeader.cy.js', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <SiteHeader/>
      </BrowserRouter>)
  })
  it('contain logo name', () => {
    cy.get(".css-p7bec2-MuiTypography-root").contains('YanAemons')
  })

  it("can input info in search bar", () => {
    cy.get("input").type("Black adam")
  })

  it("click home button", () => {
    cy.get("button")
      .contains("Home")
      .click()
  })

  it("click home button", () => {
    cy.get("button").contains("Favourites").click();
  })

  it("click home button", () => {
    cy.get("button").contains("Upcoming").click();
  })
})