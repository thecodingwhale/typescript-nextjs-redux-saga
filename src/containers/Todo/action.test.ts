import Router from 'next/router'
import { runSaga } from 'redux-saga'
import mockAxios from 'axios'
import { setCookie } from 'nookies'
import { fetchTodosAsync } from './action'

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

describe('fetchTodosAsync', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call fetch todos', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [],
      })
    )
    const initialAction = {
      payload: {},
    }
    const dispatched = await recordSaga(fetchTodosAsync, initialAction)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/todos')
  })
})
