/* tslint:disable */

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const devMode = process.env.NODE_ENV === 'development'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

  sagaMiddleware,
]

if (devMode) {
  middleware.push(logger)
}

const makeStore = (rootReducer, preloadedState) => {
  const store = configureStore({
    middleware,
    preloadedState,
    reducer: rootReducer,
    devTools: devMode,
  }) // tslint:disable
  ;(store as any).sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default (preloadedState = {}, { isServer }) => {
  if (isServer) {
    return makeStore(rootReducer, preloadedState)
  } else {
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
      key: 'nextjs',
      whitelist: ['formLogin'], // make sure it does not clash with server keys
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = makeStore(persistedReducer, preloadedState)
    // store.__persistor = persistStore(store) // Nasty hack

    return store
  }
}
