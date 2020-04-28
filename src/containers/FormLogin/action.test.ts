import Router from 'next/router'
import { runSaga } from 'redux-saga'
import mockAxios from 'axios'
import { setCookie } from 'nookies'
import { SERVER_BASE_URL } from '@lib/utils/constant'
import {
  ActionTypes,
  onFormLoginSetStatus,
  onFormLoginSuccess,
  onFormLoginSubmitAsync,
  onFormLoginLogoutAsync,
} from './action'

async function recordSaga(saga, initialAction) {
  const dispatched = []
  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    initialAction
  ).done
  return dispatched
}

jest.mock('axios')
jest.mock('next/router', () => ({ push: jest.fn() }))
jest.mock('nookies', () => ({
  setCookie: jest.fn(),
  destroyCookie: jest.fn(),
}))

const email = 'foo@email.com'
const password = 'password'
const token = 'token'

describe('onFormLoginSubmitAsync', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should authenticate and redirect to profile page', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user: { email, password, token },
        },
      })
    )
    const initialAction = {
      payload: {
        email,
        password,
      },
    }
    const dispatched = await recordSaga(onFormLoginSubmitAsync, initialAction)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${SERVER_BASE_URL}/users/login`,
      {
        user: {
          email,
          password,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    expect(dispatched).toContainEqual(onFormLoginSetStatus(ActionTypes.formStatusSubmitting))
    expect(dispatched).toContainEqual(onFormLoginSuccess({ email, password, token }))
    expect(dispatched).toContainEqual(onFormLoginSetStatus(ActionTypes.formStatusSuccess))
    expect(setCookie).toHaveBeenCalled()
    expect(Router.push).toHaveBeenCalledWith('/profile')
    expect(dispatched).toContainEqual(onFormLoginSetStatus(null))
  })

  it('should catch error on invalid login', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject(new Error('Something went wrong')))
    const initialAction = {
      payload: {
        email,
        password,
      },
    }
    const dispatched = await recordSaga(onFormLoginSubmitAsync, initialAction)
    expect(dispatched).toContainEqual(onFormLoginSetStatus(ActionTypes.formStatusError))
  })
})

describe('onFormLoginLogoutAsync', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call logout', async () => {
    const initialAction = {}
    const dispatched = await recordSaga(onFormLoginLogoutAsync, initialAction)
    expect(Router.push).toHaveBeenCalledWith('/login')
  })
})
