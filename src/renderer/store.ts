/* eslint "no-undef": 0 */
/* eslint "global-require": 0 */

import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import * as reducers from './reducers';

declare let window: any;
declare let module: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = () => createLogger();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'dev') {
    return applyMiddleware(reduxThunk, logger());
  }
  return applyMiddleware(reduxThunk);
};

const createStoreWithMiddleware = (initialState?: object): Store<reducers.IRootState> => {
  const middleware = getMiddleware();
  return createStore(reducers.combinedReducers, initialState, composeEnhancers(middleware));
};

export default function configureStore(initialState?: object): Store<reducers.IRootState> {
  const store = createStoreWithMiddleware(initialState);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer.combinedReducers);
    });
  }
  return store;
}
