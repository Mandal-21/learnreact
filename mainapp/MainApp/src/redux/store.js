import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';

const rootReducers = combineReducers({userReducer})

export const Store = createStore(rootReducers, applyMiddleware(thunk));
