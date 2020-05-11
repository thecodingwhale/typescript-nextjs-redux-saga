/* istanbul ignore file */

import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

const renderTestComponent = (reducer, props, component) => {
  let store
  let renderedComponent
  const BaseComponent = component
  store = mockStore(reducer)
  store.dispatch = jest.fn()
  renderedComponent = render(
    <Provider store={store}>
      <BaseComponent {...props} />
    </Provider>
  )
  return { store, renderedComponent }
}

export { renderTestComponent }
