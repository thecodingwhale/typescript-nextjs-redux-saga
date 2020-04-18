import * as React from 'react'

interface HelloProps {
  name?: string
}

const Hello: React.FC<HelloProps> = ({ name }: HelloProps): JSX.Element => {
  return <h1>Hello, {name}</h1>
}

Hello.defaultProps = {
  name: 'Stranger',
}

export default Hello
