import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo/view';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<Todo />
	</Provider>, 
	document.getElementById('root')
);

