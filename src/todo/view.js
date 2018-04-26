import React,{ Component } from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

class Todo extends Component {
	render(){
		return (
			<div>
				<AddTodo />
				<TodoList />
			</div>
		)
	}
}

export default Todo;