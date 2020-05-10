import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TagState } from '@containers/PopularTags/action'
import { Api } from './api'
import { apiConfig } from './api.config'

interface ResponseTagState extends TagState {
  tags: TagState[]
}

class TagAPI extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config)
    this.tags = this.tags.bind(this)
  }

  /**
   *
   * @returns {Promise<TagState>} tagState - return popular tags.
   */
  public tags(): Promise<TagState[]> {
    return this.get('/tags')
      .then((response: AxiosResponse<ResponseTagState>) => {
        return response.data.tags
      })
      .catch((error: AxiosError) => {
        throw error
      })
  }
}

export default new TagAPI(apiConfig)
