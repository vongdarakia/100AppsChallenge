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
