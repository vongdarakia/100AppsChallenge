import React from 'react';
import PropTypes from 'prop-types';
import { pad } from '../utils';
import { Link } from 'react-router-dom';

class Project extends React.Component {
	render() {
		let props = this.props;
		let id = pad(props.id, 3);
		return (
			<li
				className="project flex-item"
				onClick={ this.props.onClick }
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

Project.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default Project;
