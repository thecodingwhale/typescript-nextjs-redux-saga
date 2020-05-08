import App from 'next/app'
import React, { StatelessComponent } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { AnyAction, Store } from 'redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { RootState } from '../rootReducer'
import createStore from '../store'
import '../src/styles/styles.scss'

import Navbar from '@containers/Navbar/Navbar'

interface Props {
  store: Store<RootState, AnyAction>
  app: StatelessComponent
}

class MyApp extends App<Props, StatelessComponent> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <Navbar />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
