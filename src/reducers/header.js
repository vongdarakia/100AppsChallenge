let initState = {
	projectIdx: 0
};

const header = (state = initState, action) => {
	switch (action.type) {
		case 'CHANGE_PROJECT':
			console.log(action);
			return Object.assign({}, state, {
				projectIdx: action.projectIdx
			});
		case 'NEXT_PROJECT':
			return Object.assign({}, state, {
				projectIdx: state.projectIdx + 1
			});
		default:
			// console.log("wat");
			return state;
	}
}

export default header;
