import React from 'react';
import PropTypes from 'prop-types';
import { pad } from '../helper';

class Project extends React.Component {
	render() {
		let props = this.props;
		return (
			<li
				className="project flex-item"
				onClick={ this.props.onClick }
			>
				<a href={props.url}>
					<img src={"/img/" + pad(props.id, 3) + ".png"} alt="" />
					<div className="overlay"></div>
					<span className="project-id">{pad(props.id, 3)}</span>
					<span className="project-name">{props.name}</span>
					<span className="project-description">{props.description}</span>
				</a>
			</li>
		);
	}
}

Project.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default Project;
