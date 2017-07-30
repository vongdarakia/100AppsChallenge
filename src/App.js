import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { ProjectMap } from './data/projectMap';
import ProjectList from './components/ProjectList';
import { connect } from 'react-redux';
import Header from './components/Header';

class Portfolio extends Component {
	render() {
		let { projects } = this.props;

		return (
			<div className="Main">
				<Switch>
					<Route exact path="/" render={() => <ProjectList {...this.props}/>} />
					<Route path="/project/:projectId" render={
						(props) => {
							let newProps = { ...this.props, ...props };
							let projectId = parseInt(newProps.match.params.projectId, 10);

							if (isNaN(projectId) || projectId <= 0 || projectId > projects.length) {
								return (<Redirect to="/" />);
							}
							let { app: App, props: otherProps } = ProjectMap[projectId];

							return (
								<div>
									<Header project={projects[projectId - 1]}/>
									<App {...newProps} {...otherProps}/>
								</div>
							)
						}
					} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

// <Route exact path="/" render={
// 	() => {
// 		return React.createElement(Portfolio, { project: projects[15] });
// 	}
// } />
// {projects.map((project, idx) => {
// 	let props = ProjectMap[project.id] ? ProjectMap[project.id].props : null;
// 	let App = ProjectMap[project.id] ? ProjectMap[project.id].app : null;
//
// 	let header = (<Route
// 		key={"header-" + idx}
// 		path={"/project/" + pad(project.id, 3)}
// 		render={
// 			() => {
// 				return React.createElement(ProjectNavigationHeader, { project });
// 			}
// 		} />);
// 	if (project.id === 16) {
// 		header = "";
// 	}
// 	return (
// 		<div key={"group-" + idx}>
// 			{header}
// 			<Route
// 				key={idx}
// 				path={"/project/:projectIdx" + pad(project.id, 3)}
// 				render={
// 					() =>
// 						(<ProjectApp otherProps={props} app={app}/>)
//
// 				}
// 				 />
// 		</div>
// 	)
// })}

const mapStateToProps = state => {
	return {
		...state.portfolio
	}
};

const mapDispatchToProps = {};

const PortfolioApp = connect(
	mapStateToProps,
	mapDispatchToProps
)(Portfolio);


export default withRouter(PortfolioApp);
