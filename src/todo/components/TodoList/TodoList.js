import React from 'react';
import { connect } from 'react-redux';

function TodoList(props) {
	const list = props.todos;
	return (
		<ul>
			{
				list.map((value,index)=>{
					return <li key={index}>{value.text}</li>
				})
			}
		</ul>
	)
}

const mapStateToProps = (todos = []) => {
	return {todos};
};

export default connect(mapStateToProps,null)(TodoList);
