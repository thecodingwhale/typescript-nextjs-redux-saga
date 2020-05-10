import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '@components/Loader/Loader'
import { ActionTypes, fetchTags } from './action'

const PopularTags: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const tags = useSelector((state) => state.tags.tags)
  const status = useSelector((state) => state.tags.status)

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
              {tags.length !== 0 ? (
                <div className="buttons">
                  {tags.map((tag, index) => (
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
