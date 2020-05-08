import * as React from 'react'
import Hello from '@components/Hello/Hello'
import { onFormLoginLogout } from '@containers/FormLogin/action'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '@utils/auth'

const Profile = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => (state.formLogin.user !== null ? state.formLogin.user.username : ''))
  const onClickLogout = () => {
    dispatch(onFormLoginLogout())
  }
  return (
    <div>
      <h1>
        Hello, <span data-testid="username">{username}</span>
      </h1>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  )
}

Profile.getInitialProps = async (ctx) => {
  return auth(ctx)
}

export default Profile
