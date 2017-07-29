import React, { Component } from 'react';
import './App.css';
import Portfolio from './containers/Portfolio';
import ProjectNavigationHeader from './containers/ProjectNavigationHeader';

import { Route } from 'react-router-dom';
import { pad } from './utils';
import { ProjectMap } from './data/projectMap';

let projects = require('./data/projects');

class PortfolioApp extends Component {
	render() {
		// <Route path="/project/" component={ProjectNavigationHeader} />
		console.log({ project: projects[15] });
		return (
			<div className="Main">
				<Route exact path="/" render={
					() => {
						return React.createElement(Portfolio, { project: projects[15] });
					}
				} />
				{projects.map((project, idx) => {
					let props = ProjectMap[project.id] ? ProjectMap[project.id].props : null;
					let app = ProjectMap[project.id] ? ProjectMap[project.id].app : null;
					console.log(project);
					return (
						<div key={"group-" + idx}>
							<Route
								key={"controller-" + idx}
								path={"/project/" + pad(project.id, 3)}
								render={
									() => {
										return React.createElement(ProjectNavigationHeader, { project });
									}
								} />
							<Route
								key={idx}
								path={"/project/" + pad(project.id, 3)}
								render={
									() => {
										return React.createElement(app, props);
									}
								} />
						</div>
					)
				})}

			</div>
		);
	}
}

export default PortfolioApp;
