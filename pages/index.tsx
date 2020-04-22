import * as React from 'react'
import { useSelector } from 'react-redux'

const IndexRoot: React.FC = (): JSX.Element => {
  const selector = useSelector((state) => state.formLogin)
  return (
    <div>
      <div>Hello, {selector.user !== null ? selector.user.username : 'Stranger'}</div>
    </div>
  )
}

export default IndexRoot
