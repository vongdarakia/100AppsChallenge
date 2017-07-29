let initProjects = require('../projects/014/data/projects.json');

const projectsV1 = (state = initProjects, action) => {
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

export default projectsV1;
