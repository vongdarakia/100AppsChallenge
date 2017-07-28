let initState = {
	projectIdx: 0
};

const header = (state = initState, action) => {
	switch (action.type) {
		case 'CHANGE_PROJECT':
			return Object.assign({}, state, {
				projectIdx: action.projectIdx
			});
		default:
			return state;
	}
}

export default header;
