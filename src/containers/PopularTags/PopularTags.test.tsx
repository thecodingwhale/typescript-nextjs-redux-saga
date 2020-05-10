import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import PopularTags from './PopularTags'
import { ActionTypes } from './action'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])
const expectedTags = ['Tag One', 'Tag Two', 'Tag Three']

describe('<PopularTags />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      tags: {
        tags: [],
        status: null,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <PopularTags />
      </Provider>
    )
  })

  it('should display "No tags available"', () => {
    expect(screen.getByText('No tags available')).toBeTruthy()
  })

  it('should render title tag', async () => {
    expect(screen.getByText('Popular Tags')).toBeTruthy()
  })

  it('should render <Loader /> component while fetching tags', async () => {
    store = mockStore({
      tags: {
        tags: [],
        status: ActionTypes.onTagsFetching,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <PopularTags />
      </Provider>
    )
    const { findByTestId } = await component
    const loader = await findByTestId('loader')
    expect(loader).toBeTruthy()
  })

  it('should display error if something went wrong', async () => {
    store = mockStore({
      tags: {
        tags: [],
        status: ActionTypes.onTagsError,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <PopularTags />
      </Provider>
    )
    const { getByText } = await component
    expect(getByText('Something went wrong.')).toBeTruthy()
  })

  it('should display list of tags', async () => {
    store = mockStore({
      tags: {
        tags: expectedTags,
        status: null,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <PopularTags />
      </Provider>
    )
    const { getByText } = await component
    expectedTags.forEach((tag) => {
      expect(getByText(tag)).toBeTruthy()
    })
  })
})
