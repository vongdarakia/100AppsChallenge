import React from 'react';
import PropTypes from 'prop-types';
import { pad } from '../utils';
import { Link } from 'react-router-dom';

class ProjectBox extends React.Component {
	render() {
		let props = this.props;
		let id = pad(props.id, 3);
		return (
			<li
				className="project-box flex-item"
			>
				<Link to={"/project/" + id}>
					<img src={"/img/" + id + ".png"} alt=""/>
					<div className="overlay"></div>
					<span className="project-id">{id}</span>
					<span className="project-name">{props.name}</span>
					<span className="project-description">{props.description}</span>
				</Link>
			</li>
		);
	}
}

ProjectBox.propTypes = {
	name: PropTypes.string.isRequired
}

export default ProjectBox;
