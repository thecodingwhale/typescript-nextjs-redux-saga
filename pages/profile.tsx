import * as React from 'react'
import Hello from '@components/Hello/Hello'
import { useSelector } from 'react-redux'
import { auth } from '../src/utils/auth'

const Profile = () => {
  const { username } = useSelector((state) => state.formLogin.user)
  return (
    <div>
      <Hello name={username} />
      <button>Logout</button>
    </div>
  )
}

Profile.getInitialProps = async (ctx) => {
  return auth(ctx)
}

export default Profile
