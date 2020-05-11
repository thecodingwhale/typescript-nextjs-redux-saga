import { SERVER_BASE_URL } from '../../lib/utils/constant'

describe('Popular Tags', () => {
  it('should display the expected tags', () => {
    const expectedTags = ['tag one', 'tag two', 'tag three']
    cy.server().route({
      method: 'GET',
      url: `${SERVER_BASE_URL}/tags`,
      status: 200,
      response: {
        tags: expectedTags,
      },
    })
    cy.visit('/')
    cy.get('[data-testid="popular-tags-title"]').should('contain', 'Popular Tags')
    expectedTags.forEach((tag) => {
      cy.contains(tag)
    })
  })

  it('should display error message after failing the request', () => {
    cy.server().route({
      method: 'GET',
      url: `${SERVER_BASE_URL}/tags`,
      status: 400,
      response: {
        tags: [],
      },
    })
    cy.visit('/')
    cy.get('[data-testid="popular-tags-title"]').should('contain', 'Popular Tags')
    cy.contains('Something went wrong.')
  })

  it('should display the expected tags', () => {
    cy.server().route({
      method: 'GET',
      url: `${SERVER_BASE_URL}/tags`,
      status: 200,
      response: {
        tags: [],
      },
    })
    cy.visit('/')
    cy.get('[data-testid="popular-tags-title"]').should('contain', 'Popular Tags')
    cy.contains('No tags available')
  })
})
