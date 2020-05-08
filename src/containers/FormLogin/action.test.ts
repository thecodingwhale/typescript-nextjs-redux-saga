import Router from 'next/router'
import { runSaga } from 'redux-saga'
import { setCookie } from 'nookies'
import UserAPI from '@lib/api/user'

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
  ).toPromise
  return dispatched
}

// jest.mock('axios', () => ({
//   interceptors: {
//     request: { use: jest.fn(), eject: jest.fn() },
//     response: { use: jest.fn(), eject: jest.fn() },
//   },
// }))
// jest.mock('axios')
jest.mock('next/router', () => ({ push: jest.fn() }))
jest.mock('nookies', () => ({
  setCookie: jest.fn(),
  destroyCookie: jest.fn(),
}))

const id = 1
const image = 'iimage'
const email = 'foo@email.com'
const password = 'password'
const token = 'token'
const bio = 'bio'
const createdAt = 'createdAt'
const updatedAt = 'updatedAt'
const username = 'username'

const expectedResponse = {
  id,
  image,
  email,
  token,
  bio,
  createdAt,
  updatedAt,
  username,
}

describe('onFormLoginSubmitAsync', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should authenticate and redirect to profile page', async () => {
    jest.spyOn(UserAPI, 'login').mockResolvedValue({ ...expectedResponse })
    const dispatched = await recordSaga(onFormLoginSubmitAsync, {
      payload: {
        email,
        password,
      },
    })
    expect(dispatched).toContainEqual(onFormLoginSetStatus(ActionTypes.formStatusSubmitting))
    expect(dispatched).toContainEqual(onFormLoginSuccess(expectedResponse))
    expect(dispatched).toContainEqual(onFormLoginSetStatus(ActionTypes.formStatusSuccess))
    expect(setCookie).toHaveBeenCalled()
    expect(Router.push).toHaveBeenCalledWith('/profile')
    expect(dispatched).toContainEqual(onFormLoginSetStatus(null))
  })

  it('should catch error on invalid login', async () => {
    jest.spyOn(UserAPI, 'login').mockRejectedValue('error')
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
