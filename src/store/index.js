import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducer';

const middleware = process.env.NODE_ENV === 'development' ? applyMiddleware(ReduxThunk, logger) : applyMiddleware(ReduxThunk);

const store = createStore(rootReducer, middleware);

export default () => {
  return { store };
};
