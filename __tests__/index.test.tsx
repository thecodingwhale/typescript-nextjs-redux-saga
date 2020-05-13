import { screen } from '@testing-library/react'
import { renderTestComponent } from '@lib/utils/testing'
import IndexRoot from '../pages/index'

describe('Index Root', () => {
  beforeEach(() => {
    renderTestComponent(
      {
        tags: {
          data: [],
          status: null,
        },
        formLogin: {
          user: null,
        },
      },
      {},
      IndexRoot
    )
  })

  it('should render <PopularTags />', async () => {
    expect(screen.getByText('Popular Tags')).toBeTruthy()
  })

  it('should display your feed if the user is login', async () => {
    renderTestComponent(
      {
        tags: {
          data: [],
          status: null,
        },
        formLogin: {
          user: {
            username: 'John Doe',
          },
        },
      },
      {},
      IndexRoot
    )
    expect(screen.getByText('Your Feed')).toBeTruthy()
  })
})
