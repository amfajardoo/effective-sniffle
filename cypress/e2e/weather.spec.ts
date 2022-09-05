describe('Weather Page', () => {
  it('Visits the initial project page', () => {
    cy.visit('/weather')
    cy.contains('h1', 'Weather App')
  })

  it('Should input a city and display the weather detail', () => {
    cy.get('[data-testid=location-input]').type('Colombia, Sabaneta')
    cy.get('[data-testid=weather-detail] p').should('contain', 'The temperature in Colombia, Sabaneta is')
  })
})
