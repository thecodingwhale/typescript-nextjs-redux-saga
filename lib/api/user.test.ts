import axios, { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { SERVER_BASE_URL } from '@lib/utils/constant'
import { apiConfig } from './api.config'
import { UserAPI } from './user'

const mock = new MockAdapter(axios)
const user = {
  bio: 'bio',
  createdAt: 'createdAt',
  id: 1,
  image: 'image',
  token: 'token',
  updatedAt: 'updatedAt',
  username: 'username',
  email: 'email@email.com',
  password: 'password',
}
describe('Users Api', () => {
  it('should call the expected response', async () => {
    mock.onPost(`${SERVER_BASE_URL}/users/login`).reply(200, { user })
    const api = new UserAPI(apiConfig)
    const response = await api.login({ email: user.email, password: user.password })
    const { password, ...newUser } = user
    expect(response).toEqual(newUser)
    expect(mock.history.post).toBeTruthy()
    expect(mock.history.post[0].url).toEqual('/users/login')
  })

  it('should match the expected error', async () => {
    mock.onPost(`${SERVER_BASE_URL}/users/login`).reply(404, 'Something when wrong.')
    const api = new UserAPI(apiConfig)
    api.login({ email: user.email, password: user.password }).catch((error) => {
      expect(error.isAxiosError).toEqual(true)
    })
  })
})
