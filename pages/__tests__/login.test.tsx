import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import LoginPage from '../login'
import { onFormLoginSubmit, FormData, ActionTypes } from '@containers/FormLogin/action'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

const props = {
  onFormLoginSubmit,
}

describe('<LoginPage />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      formLogin: {
        status: null,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    )
  })

  it('should have inputs emails and password with submit button with expected text', async () => {
    const { findByTestId } = await component
    const email = await findByTestId('email')
    const password = await findByTestId('password')
    const buttonSubmit = await findByTestId('submit')
    expect(email).toBeDefined()
    expect(password).toBeDefined()
    expect(buttonSubmit).toBeDefined()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should display error messages upon submission when email and password fields are empty', async () => {
    const { findByTestId } = await component
    const buttonSubmit = await findByTestId('submit')
    fireEvent.click(buttonSubmit)
    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  it('should call onFormLoginSubmit', async () => {
    const user = {
      email: 'sample@email.com',
      password: 'password',
    }
    const { findByTestId } = await component
    const email = await findByTestId('email')
    const password = await findByTestId('password')
    const buttonSubmit = await findByTestId('submit')

    fireEvent.change(email, { target: { value: user.email } })
    fireEvent.change(password, { target: { value: user.password } })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(onFormLoginSubmit({ email: user.email, password: user.password }))
    })
  })

  it('should display error message', async () => {
    store = mockStore({
      formLogin: {
        status: ActionTypes.formStatusError,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    )
    expect(screen.getByText('Email or password is invalid.')).toBeInTheDocument()
  })

  it('should display success message', async () => {
    store = mockStore({
      formLogin: {
        status: ActionTypes.formStatusSuccess,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    )
    expect(screen.getByText('Welcome, thewolfremembers.')).toBeInTheDocument()
    expect(screen.getByText('Redirecting...')).toBeInTheDocument()
  })

  it('should display submitting message', async () => {
    store = mockStore({
      formLogin: {
        status: ActionTypes.formStatusSubmitting,
      },
    })
    store.dispatch = jest.fn()
    component = render(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    )
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
  })
})
