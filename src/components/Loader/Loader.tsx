import * as React from 'react'

const Loader: React.FC = (): JSX.Element => {
  return (
    <div className="loader-wrapper" data-testid="loader">
      <div className="loader is-loading"></div>
    </div>
  )
}
export default Loader
