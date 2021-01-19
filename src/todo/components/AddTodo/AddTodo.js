import React,{ useState } from 'react';
import { addTodo } from '../../action';
import { connect } from 'react-redux';

function AddTodo(props) {
	const [value, setValue] = useState('');

	function handleInput(e){
		e.preventDefault();
		setValue(e.target.value)
	}

	function handleSubmit(e){
		e.preventDefault();
		if(!value.trim()){
			alert('请输入内容！');
			return;
		} else {
			props.onAdd(value.trim());
			setValue('');
		}
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input type="text" value={value} onChange={(e) => handleInput(e)} />
			<button type="submit">添加</button>
		</form>
	)
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



