import React from 'react';
import Project from './Project';
import PropTypes from 'prop-types';

class ProjectList extends React.Component {
	render() {
		let onProjectClick = this.props.onProjectClick;
		let projects = this.props.projects;

		return (
			<div className="projects-container">
				<h2>100 Apps Challenge</h2>
				<ul
					className="projects flex-container"
				>
					{projects.map(project => (
						<Project key={project.id} {...project} onClick={() => onProjectClick(project)} />
					))}
				</ul>
			</div>
		)
	}
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onProjectClick: PropTypes.func.isRequired
}

export default ProjectList;
