import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '@components/Loader/Loader'
import { ActionTypes, fetchTags, TagState } from './action'
import { StoreState } from '../../../rootReducer'

const PopularTags: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const { data, status }: TagState = useSelector((state: StoreState): TagState => state.tags)

  React.useEffect(() => {
    dispatch(fetchTags())
  }, [])

  return (
    <React.Fragment>
      <h5 className="title is-5" data-testid="popular-tags-title">
        Popular Tags
      </h5>
      {status === ActionTypes.onTagsFetching ? (
        <Loader />
      ) : (
        <React.Fragment>
          {status !== ActionTypes.onTagsError ? (
            <React.Fragment>
              {data.length !== 0 ? (
                <div className="buttons">
                  {data.map((tag, index) => (
                    <a key={`${index}-${tag}`} className="button is-small is-rounded">
                      {tag}
                    </a>
                  ))}
                </div>
              ) : (
                <p>No tags available</p>
              )}
            </React.Fragment>
          ) : (
            <div className="notification is-danger">Something went wrong.</div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default PopularTags
