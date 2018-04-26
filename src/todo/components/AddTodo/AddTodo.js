import React,{ Component } from 'react';
import { addTodo } from '../../action';
import { connect } from 'react-redux';


class AddTodo extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
		};
	}

	handleInput(e){
		e.preventDefault();
		this.setState({
			value: e.target.value,
		});
	}

	handleSubmit(e){
		e.preventDefault();
		let { value } = this.state;
		if(!value.trim()){
			alert('请输入内容！');
			return;
		} else {
			value = value.trim();
			this.props.onAdd(value);
			this.setState({
				value: '',
			});
		}
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
				<button type="submit">添加</button>
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAdd: (text) => {
			dispatch(addTodo(text));
		}
	}
}
// dispatch一个action，所以需要import 这个action

// connect用于连接状态树和组件，来自于react-redux
export default connect(null,mapDispatchToProps)(AddTodo);



