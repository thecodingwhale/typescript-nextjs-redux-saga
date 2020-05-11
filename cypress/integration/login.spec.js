import { SERVER_BASE_URL } from '../../lib/utils/constant'

describe('Login and Logout', () => {
  it('should login, redirect to profile and logout', () => {
    cy.server().route({
      method: 'POST',
      url: `${SERVER_BASE_URL}/users/login`,
      status: 200,
      response: {
        user: {
          id: 93633,
          email: 'wolflotus@gmail.com',
          createdAt: '2020-04-21T16:19:24.699Z',
          updatedAt: '2020-04-21T16:19:24.705Z',
          username: 'wolflotus',
          bio: null,
          image: null,
        },
      },
    })

    // login
    cy.visit('/login')
    cy.get('[data-testid="email"]').type('wolflotus@gmail.com')
    cy.get('[data-testid="password"]').type('wolflotus')
    cy.get('form').submit()

    cy.url().should('contain', '/profile')
    cy.get('[data-testid="username"]').should('contain', 'wolflotus')
    cy.get('button').click()
    cy.url().should('contain', '/login')
  })
})
