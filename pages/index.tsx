import * as React from 'react'
import { useSelector } from 'react-redux'

const IndexRoot: React.FC = (): JSX.Element => {
  const selector = useSelector((state) => state.formLogin)
  console.log('selector: ', selector.user)
  return (
    <div>
      <div>Test</div>
    </div>
  )
}

export default IndexRoot
