describe('Login and Logout', () => {
  it('should to go to login page', () => {
    cy.visit('/login')
  })
  it('requires email', () => {
    cy.get('[data-testid="email"]').type('wolflotus@gmail.com')
  })
  it('requires password', () => {
    cy.get('[data-testid="password"]').type('wolflotus')
  })
  it('can submit a valid form', () => {
    cy.get('form').submit()
  })
  it('should go to profile page with expected username', () => {
    cy.url().should('contain', '/profile')
    cy.get('[data-testid="username"]').should('contain', 'wolflotus')
  })
  it('can press button to logout', () => {
    cy.get('button').click()
    cy.url().should('contain', '/login')
  })
})
