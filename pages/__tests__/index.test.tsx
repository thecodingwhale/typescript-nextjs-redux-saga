import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import IndexRoot from '../index'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Index Root', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      tags: {
        tags: [],
        status: null,
      },
      formLogin: {
        user: null,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <IndexRoot />
      </Provider>
    )
  })

  it('should render <PopularTags />', async () => {
    expect(screen.getByText('Popular Tags')).toBeTruthy()
  })

  it('should display your feed if the user is login', async () => {
    store = mockStore({
      tags: {
        tags: [],
        status: null,
      },
      formLogin: {
        user: {
          username: 'John Doe',
        },
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <IndexRoot />
      </Provider>
    )
    expect(screen.getByText('Your Feed')).toBeTruthy()
  })
})
