import React,{ Component } from 'react';
import { connect } from 'react-redux';

class TodoList extends Component {
	render(){
		console.log(this.props);
		const list = this.props.todos;
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
}

const mapStateToProps = (todos = []) => {
	return {todos};
};

export default connect(mapStateToProps,null)(TodoList);
