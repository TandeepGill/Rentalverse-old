import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import allPropertiesReducer from './allProperties/allProperties';
import singlePropertyReducer from './singleProperty/singleProperty';
import allTenantsReducer from './allTenants/allTenants';

const reducer = combineReducers({
  auth,
  properties: allPropertiesReducer,
  property: singlePropertyReducer,
  tenants: allTenantsReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
