import * as React from 'react'
import { useSelector } from 'react-redux'
import PopularTags from '@containers/PopularTags/PopularTags'

const IndexRoot: React.FC = (): JSX.Element => {
  const user = useSelector((state) => state.formLogin.user)
  return (
    <React.Fragment>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Conduit</h1>
            <h2 className="subtitle">A place to share your knowledge.</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="tabs">
              <ul>
                {user !== null && (
                  <li>
                    <a>Your Feed</a>
                  </li>
                )}
                <li className="is-active">
                  <a>Global Feed</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="column">
            <PopularTags />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IndexRoot
