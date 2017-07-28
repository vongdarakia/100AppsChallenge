
// let initProjects = [
// 	{ id: 1, name: "001" },
// 	{ id: 2, name: "002" },
// 	{ id: 3, name: "003" },
// 	{ id: 4, name: "004" }
// ];

let initProjects = require('../data/projects.json');
console.log(initProjects);

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
