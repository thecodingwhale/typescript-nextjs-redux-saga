import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faExclamationTriangle, faUser } from '@fortawesome/free-solid-svg-icons'
import { ActionTypes, onFormLoginSubmit, FormData, UserState } from '@containers/FormLogin/action'
import { StoreState } from '../rootReducer'

interface FormLoginProps {
  onFormLoginSubmit: typeof onFormLoginSubmit
}

const LoginRoot: React.FC<FormLoginProps> = (): JSX.Element => {
  const dispatch = useDispatch()
  const selector = useSelector((state: StoreState): UserState => state.formLogin)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ email, password }: FormData): void => {
    dispatch(onFormLoginSubmit({ email, password }))
  })
  const isDanger = (error: object): string => {
    return error ? ' is-danger' : ''
  }
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={onSubmit} noValidate>
                {selector.status === ActionTypes.formStatusError && (
                  <div className="notification is-danger">Email or password is invalid.</div>
                )}
                {selector.status === ActionTypes.formStatusSuccess && (
                  <div className="notification is-success">Welcome, thewolfremembers.</div>
                )}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      data-testid="email"
                      disabled={
                        selector.status === ActionTypes.formStatusSubmitting ||
                        selector.status === ActionTypes.formStatusSuccess
                      }
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
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      data-testid="password"
                      disabled={
                        selector.status === ActionTypes.formStatusSubmitting ||
                        selector.status === ActionTypes.formStatusSuccess
                      }
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
                  </div>
                  {errors.password && <p className="help is-danger">{errors.password.message}</p>}
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      data-testid="submit"
                      type="submit"
                      className="button is-link"
                      disabled={
                        selector.status === ActionTypes.formStatusSubmitting ||
                        selector.status === ActionTypes.formStatusSuccess
                      }
                    >
                      {selector.status === ActionTypes.formStatusSubmitting
                        ? 'Submitting...'
                        : selector.status === ActionTypes.formStatusSuccess
                        ? 'Redirecting...'
                        : 'Submit'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginRoot
