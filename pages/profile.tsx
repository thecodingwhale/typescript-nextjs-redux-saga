import * as React from 'react'
import Hello from '@components/Hello/Hello'
import { auth } from '../src/utils/auth'

const Profile = () => {
  return (
    <div>
      <Hello />
    </div>
  )
}

Profile.getInitialProps = async (ctx) => {
  const token = auth(ctx)
  return { token }
}

export default Profile
