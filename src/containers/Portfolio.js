import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import ProjectList from '../components/ProjectList';
import { nextProject } from '../actions';

const mapStateToProps = state => {
	// console.log("map");
	// console.log(state);
	return {
		projects: state.portfolio.projects,
		projectId: state.portfolio.projectId
	}
}

function something(project) {
	console.log("something");
	return {
		...project,
		type: 'SOMETHING'
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onProjectClick: (project) => {
// 			dispatch(something(project));
// 		},
// 		nextProject: () => {
// 			dispatch(nextProject());
// 		}
// 		// actions: bindActionCreators(Actions, dispatch)
// 	};
// }

const mapDispatchToProps = {
	nextProject,
	onProjectClick: something
}

const Portfolio = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectList);

export default Portfolio;
