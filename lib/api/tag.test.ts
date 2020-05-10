import axios, { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { SERVER_BASE_URL } from '@lib/utils/constant'
import { apiConfig } from './api.config'
import { TagAPI } from './tag'

const mock = new MockAdapter(axios)

describe('Tags API', () => {
  afterEach(() => {
    mock.reset()
  })
  it('should call the expected response', async () => {
    const expectedResponse = ['first', 'second', 'third']
    mock.onGet(`${SERVER_BASE_URL}/tags`).reply(200, {
      tags: expectedResponse,
    })
    const api = new TagAPI(apiConfig)
    const response = await api.tags()
    expect(response).toEqual(expectedResponse)
    expect(mock.history.get).toBeTruthy()
    expect(mock.history.get[0].url).toEqual('/tags')
  })

  it('should match the expected error', async () => {
    mock.onGet(`${SERVER_BASE_URL}/tags`).reply(404, 'Something when wrong.')
    const api = new TagAPI(apiConfig)
    api.tags().catch((error) => {
      expect(error.isAxiosError).toEqual(true)
    })
  })
})
