import axios from 'axios'
import { SERVER_BASE_URL } from '../utils/constant'

const UserAPI = {
  login: async ({ email, password }) => {
    try {
      return axios.post(
        `${SERVER_BASE_URL}/users/login`,
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
      console.log('error.response.data.errors: ', error.response.data.errors)
      return error.response
    }
  },
}

export default UserAPI
