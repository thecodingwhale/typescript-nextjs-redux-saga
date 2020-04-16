import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

export default (preloadedState = {}) => {
  const store = configureStore({
    middleware,
    preloadedState,
    reducer: rootReducer,
    devTools: devMode
  });
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
