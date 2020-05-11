import { screen } from '@testing-library/react'
import { renderTestComponent } from '@lib/utils/testing'
import PopularTags from './PopularTags'
import { ActionTypes } from './action'

const expectedTags = ['Tag One', 'Tag Two', 'Tag Three']

describe('<PopularTags />', () => {
  beforeEach(() => {
    renderTestComponent(
      {
        tags: {
          data: [],
          status: null,
        },
      },
      {},
      PopularTags
    )
  })

  it('should display "No tags available"', () => {
    expect(screen.getByText('No tags available')).toBeTruthy()
  })

  it('should render title tag', async () => {
    expect(screen.getByText('Popular Tags')).toBeTruthy()
  })

  it('should render <Loader /> component while fetching tags', async () => {
    const { store, renderedComponent } = renderTestComponent(
      {
        tags: {
          data: [],
          status: ActionTypes.onTagsFetching,
        },
      },
      {},
      PopularTags
    )
    const { findByTestId } = await renderedComponent
    const loader = await findByTestId('loader')
    expect(loader).toBeTruthy()
  })

  it('should display error if something went wrong', async () => {
    const { store, renderedComponent } = renderTestComponent(
      {
        tags: {
          data: [],
          status: ActionTypes.onTagsError,
        },
      },
      {},
      PopularTags
    )
    const { getByText } = await renderedComponent
    expect(getByText('Something went wrong.')).toBeTruthy()
  })

  it('should display list of tags', async () => {
    const { store, renderedComponent } = renderTestComponent(
      {
        tags: {
          data: expectedTags,
          status: null,
        },
      },
      {},
      PopularTags
    )
    const { getByText } = await renderedComponent
    expectedTags.forEach((tag) => {
      expect(getByText(tag)).toBeTruthy()
    })
  })
})
