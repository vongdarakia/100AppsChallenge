let initProjects = require('../data/projects.json');

const projects = (state = initProjects, action) => {
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

export default projects;
