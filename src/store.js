import { createStore } from 'redux'; 
// import { createStore, combineReducers } from 'redux';
import todos from './todo/reducer';

const store = createStore(todos);

/*
const store = createStore(
  combineReducers({ todos1, todos2, ... }),
);
*/

export default store;