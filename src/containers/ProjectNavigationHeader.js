import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { changeProject, nextProject } from '../actions';
import Header from '../components/Header';

// The state is the store
const mapStateToProps = state => {
	return {
		projectIdx: state.header.projectIdx,
		projects: state.projects
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeProject: (idx) => {
			dispatch(changeProject(idx));
		},
		nextProject: () => {
			dispatch(nextProject());
		}
		// actions: bindActionCreators(Actions, dispatch)
	};
}

const ProjectNavigationHeader = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

export default ProjectNavigationHeader;
