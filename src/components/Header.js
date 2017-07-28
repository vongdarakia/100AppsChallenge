import React from 'react';
import PropTypes from 'prop-types';
// import { pad } from '../utils';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	render() {

		let props = this.props;
		console.log(props);
		// let id = pad(props.id, 3);
		return (
			<div className="header">
				{props.projects[props.projectIdx].name}
			</div>
			// <li
			// 	className="project flex-item"
			// 	onClick={ this.props.onClick }
			// >
			// 	<Link to={"/" + id}>
			// 		<img src={"img/" + id + ".png"} alt=""/>
			// 		<div className="overlay"></div>
			// 		<span className="project-id">{id}</span>
			// 		<span className="project-name">{props.name}</span>
			// 		<span className="project-description">{props.description}</span>
			// 	</Link>
			// </li>
		);
	}
}

// Header.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	onClick: PropTypes.func.isRequired
// }

export default Header;
