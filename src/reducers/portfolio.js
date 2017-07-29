let initProjects = require('../data/projects.json');
let initState = {
	projects: initProjects,
	currIdx: 0
}
const portfolio = (state = initState, action) => {
	console.log(state);
	switch (action.type) {
		case 'DO_SOMETHING':
			return [
				...state,
				{
					id: action.id,
					name: action.name
				}
			];
		default:
			return state;
	}
}

export default portfolio;
