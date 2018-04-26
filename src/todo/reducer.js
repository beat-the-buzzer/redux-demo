const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					text: action.text,
					id: action.id,
					completed: false,
				}
			];
		default :
			return state;
	}
}

export default todos;