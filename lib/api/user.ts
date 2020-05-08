import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Api } from './api'
import { LoginCredentials, UserState } from '@containers/FormLogin/action'
import { apiConfig } from './api.config'

interface ResponseUserState extends UserState {
  user: UserState
}

class UserAPI extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config)
    this.login = this.login.bind(this)
  }

  /**
   *
   * @param {object} credentials - user's identifications.
   * @param {string} credentials.email - user's email.
   * @param {string} credentials.password - user's password.
   * @returns {Promise<UserState>} userState - user information,
   */
  public login(credentials: LoginCredentials): Promise<UserState> {
    return this.post<UserState>(
      '/users/login',
      JSON.parse(
        JSON.stringify({
          user: credentials,
        })
      )
    )
      .then((response: AxiosResponse<ResponseUserState>) => {
        const state: UserState = {
          bio: response.data.user.bio,
          createdAt: response.data.user.createdAt,
          email: response.data.user.email,
          id: response.data.user.id,
          image: response.data.user.image,
          token: response.data.user.token,
          updatedAt: response.data.user.updatedAt,
          username: response.data.user.username,
        }
        return state
      })
      .catch((error: AxiosError) => {
        throw error
      })
  }
}

export { UserAPI }

export default new UserAPI(apiConfig)
