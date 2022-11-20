import SiteHeader from '../../src/components/siteHeader'
describe('siteHeader.cy.js', () => {
  it('SiteHeader', () => {
    cy.mount(<SiteHeader />)
  })
})