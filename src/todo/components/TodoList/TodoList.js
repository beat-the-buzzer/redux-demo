import React,{ Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (todos = []) => {
	return {todos};
};

@connect(mapStateToProps, null)
export default class TodoList extends Component {
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
