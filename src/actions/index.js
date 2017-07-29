let nextId = 5;

export const doSomething = (name) => {
	console.log(name);
	return {
		type: 'DO_SOMETHING',
		id: nextId++,
		name
	}
}

export const changeProject = (projectIdx) => {
	console.log("changing project");
	console.log(projectIdx);
	return {
		type: 'CHANGE_PROJECT',
		projectIdx
	}
}

export const nextProject = () => {
	console.log("next project");
	// console.log(projectIdx);
	return {
		type: 'NEXT_PROJECT'
	}
}

// export const setVisibilityFilter = filter => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }
