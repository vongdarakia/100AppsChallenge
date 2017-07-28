import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import ProjectList from '../components/ProjectList';

const mapStateToProps = state => {
	return {
		projects: state.projects
	}
}

function something(project) {
	return {
		...project,
		type: 'SOMETHING'
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onProjectClick: (project) => {
			dispatch(something(project));
		}
		// actions: bindActionCreators(Actions, dispatch)
	};
}

const Portfolio = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectList);

export default Portfolio;
