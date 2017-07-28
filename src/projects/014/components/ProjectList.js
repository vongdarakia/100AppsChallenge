import React from 'react';
// import { connect } from 'react-redux';
// import { doSomething } from '../actions';
import Project from './Project';
import PropTypes from 'prop-types';

const ProjectList = ({ projects, onProjectClick }) => (
	<ul
		className="projects flex-container"
	>
		{projects.map(project => (
			<Project key={project.id} {...project} onClick={() => onProjectClick(project)} />
		))}
	</ul>
)

ProjectList.propTypes = {
	// doSomething: PropTypes.func.isRequired,
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onProjectClick: PropTypes.func.isRequired
}

export default ProjectList;
