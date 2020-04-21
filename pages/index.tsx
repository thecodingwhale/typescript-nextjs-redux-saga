import * as React from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faEnvelope, faExclamationTriangle, faUser, faCheck } from '@fortawesome/free-solid-svg-icons'

type FormData = {
  email: string
  password: string
}

const IndexRoot: React.FC = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password)
  })
  const isDanger = (error: object): string => {
    return error ? ' is-danger' : ''
  }
  return (
    <div className="container">
      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input${isDanger(errors.email)}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: 'Email address is required',
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            {errors.email && (
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}
          </div>
          {errors.email && <p className="help is-danger">{errors.email.message}</p>}
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input${isDanger(errors.password)}`}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="on"
              ref={register({
                required: 'Password is required',
                minLength: 8,
              })}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
            {errors.email && (
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}
            {/* <span className="icon is-small is-right">
          <FontAwesomeIcon icon={faCheck} />
        </span> */}
          </div>
          {errors.password && <p className="help is-danger">{errors.password.message}</p>}
          {/* <p className="help is-success">This password is available</p> */}
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default IndexRoot
