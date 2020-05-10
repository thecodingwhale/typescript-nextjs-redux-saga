import { runSaga } from 'redux-saga'
import { useSelector } from 'react-redux'
import TagApi from '@lib/api/tag'
import {
  TagState,
  ActionTypes,
  TagsSetStatusAction,
  fetchTags,
  onTagsSetStatus,
  setTags,
  onFetchTagsAsync,
  watchPopularTagsSagas,
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

const expectedTags = [
  {
    name: 'Tag One',
  },
  {
    name: 'Tag Two',
  },
  {
    name: 'Tag Three',
  },
]

describe('onFetchTagsAsync', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch tags from api', async () => {
    jest.spyOn(TagApi, 'tags').mockResolvedValue(expectedTags)
    const dispatched = await recordSaga(onFetchTagsAsync, {})
    expect(dispatched).toContainEqual(onTagsSetStatus(ActionTypes.onTagsFetching))
    expect(dispatched).toContainEqual(setTags(expectedTags))
    expect(dispatched).toContainEqual(onTagsSetStatus(null))
  })

  it('should return error state if api throw error', async () => {
    jest.spyOn(TagApi, 'tags').mockRejectedValue('Something went wrong')
    const dispatched = await recordSaga(onFetchTagsAsync, {})
    expect(dispatched).toContainEqual(onTagsSetStatus(ActionTypes.onTagsFetching))
    expect(dispatched).toContainEqual(onTagsSetStatus(ActionTypes.onTagsError))
  })
})
