import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import appReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app']
};

const history = createBrowserHistory();

const persistedReducer = persistCombineReducers(persistConfig, {
  router: connectRouter(history),
  ...appReducers,
});

const store = createStore(persistedReducer, applyMiddleware(routerMiddleware(history), thunk, logger));
const persistor = persistStore(store);

export { history, store, persistor };
