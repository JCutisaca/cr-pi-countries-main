import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { loadState, saveState } from '../utils/localStorage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
