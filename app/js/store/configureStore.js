import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from '../reducers/auth';
import user from '../reducers/user';

const logger = createLogger();
const rootReducer = combineReducers({
  auth,
  user,
});

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f => f
    ));
  }

  return store;
}
