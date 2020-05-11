import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../login'
import { onFormLoginSubmit, ActionTypes } from '@containers/FormLogin/action'
import { renderTestComponent } from '@lib/utils/testing'

const props = {
  onFormLoginSubmit,
}

describe('<LoginPage />', () => {
  let testStore
  let testComponent

  beforeEach(() => {
    const { store, renderedComponent } = renderTestComponent(
      {
        formLogin: {
          status: null,
        },
      },
      props,
      LoginPage
    )
    testStore = store
    testComponent = renderedComponent
  })

  it('should have inputs emails and password with submit button with expected text', async () => {
    const { findByTestId } = await testComponent
    const email = await findByTestId('email')
    const password = await findByTestId('password')
    const buttonSubmit = await findByTestId('submit')
    expect(email).toBeDefined()
    expect(password).toBeDefined()
    expect(buttonSubmit).toBeDefined()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should display error messages upon submission when email and password fields are empty', async () => {
    const { findByTestId } = await testComponent
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
    const { findByTestId } = await testComponent
    const email = await findByTestId('email')
    const password = await findByTestId('password')
    const buttonSubmit = await findByTestId('submit')

    fireEvent.change(email, { target: { value: user.email } })
    fireEvent.change(password, { target: { value: user.password } })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      expect(testStore.dispatch).toHaveBeenCalledTimes(1)
      expect(testStore.dispatch).toHaveBeenCalledWith(onFormLoginSubmit({ email: user.email, password: user.password }))
    })
  })

  it('should display error message', async () => {
    renderTestComponent(
      {
        formLogin: {
          status: ActionTypes.formStatusError,
        },
      },
      props,
      LoginPage
    )

    expect(screen.getByText('Email or password is invalid.')).toBeInTheDocument()
  })

  it('should display success message', async () => {
    renderTestComponent(
      {
        formLogin: {
          status: ActionTypes.formStatusSuccess,
        },
      },
      props,
      LoginPage
    )

    expect(screen.getByText('Welcome, thewolfremembers.')).toBeInTheDocument()
    expect(screen.getByText('Redirecting...')).toBeInTheDocument()
  })

  it('should display submitting message', async () => {
    renderTestComponent(
      {
        formLogin: {
          status: ActionTypes.formStatusSubmitting,
        },
      },
      props,
      LoginPage
    )

    expect(screen.getByText('Submitting...')).toBeInTheDocument()
  })
})
