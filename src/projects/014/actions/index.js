let nextId = 5;

export const doSomething = (name) => {
	console.log(name);
	return {
		type: 'DO_SOMETHING',
		id: nextId++,
		name
	}
}

// export const setVisibilityFilter = filter => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }
