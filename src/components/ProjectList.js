import React from 'react';
import ProjectBox from './ProjectBox';
import PropTypes from 'prop-types';

class ProjectList extends React.Component {
	render() {
		let projects = this.props.projects;

		return (
			<div className="projects-container">
				<h2>100 Apps Challenge</h2>
				<ul
					className="projects flex-container"
				>
					{projects.map(project => (
						<ProjectBox key={project.id} {...project}/>
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
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired
		}).isRequired
	).isRequired
}

export default ProjectList;
