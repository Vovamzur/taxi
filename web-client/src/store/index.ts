import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import profileReducer from 'containers/Profile/reducer';

export const history = createBrowserHistory();

const initialState = {};
const middlewares = [thunk, routerMiddleware(history)];
const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));
const reducers = {
  profile: profileReducer
};
const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
